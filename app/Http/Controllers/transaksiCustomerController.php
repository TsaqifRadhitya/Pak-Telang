<?php

namespace App\Http\Controllers;

use App\Mail\newTransaction;
use App\Models\DetailTransaksi;
use App\Models\Mutasi;
use App\Models\Product;
use App\Models\productDetail;
use App\Models\Transaksi;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Midtrans\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Midtrans\Snap;

class transaksiCustomerController extends Controller
{
    public function index()
    {
        $transactions = Transaksi::with(['detailTransaksis.product'])->where('customerId', Auth::user()->id)->orderBy('created_at', 'desc')->get();
        $transactions = $transactions->map(function ($item) {
            return [...$item->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $item->id)->sum('subTotal')];
        });
        return Inertia::render('Customer/Transaksi/index', compact('transactions'));
    }

    private function getFullAdress()
    {
        $district = Auth::user()->district()->first();
        $city = $district->city()->first();
        $province = $city->province()->first();
        return [
            'address' => Auth::user()->address,
            'postalCode' =>  Auth::user()->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }


    public function create(Request $request)
    {
        if (Auth::user()->role !== 'Customer') {
            return back()->with('info', 'Pemesanan product hanya tersedia untuk customer');
        }

        if (!Auth::user()->address) {
            return redirect(route('customer.profile.edit', ['fts' => true]))
                ->with('error', 'Harap melengkapi alamat sebelum melakuakan pemesanan');
        }

        $cityId = Auth::user()->district()->first()->cityId;
        $selectedProduct = $request->id;

        // Bisa diubah nanti jadi array kalau mau support keranjang
        $productIds = Product::where('productType', 'Barang jadi')->pluck('id')->toArray();

        // Step 1: Ambil rata-rata stok semua produk yg dicari, hanya dari penyedia sesuai wilayah dan tipe 'Barang jadi'
        $avgStokRows = productDetail::select('productId', DB::raw('AVG(stock) as avg_stock'))
            ->whereIn('productId', Product::where('productType', 'Barang jadi')->get()->map(function ($item) {
                return $item->id;
            }))
            ->whereRelation('product', 'productType', 'Barang jadi')
            ->whereHas('user', function ($q) use ($cityId) {
                $q->where(function ($q) use ($cityId) {
                    $q->where('role', 'Pak Telang')
                        ->whereHas('district', fn($dq) => $dq->where('cityId', $cityId));
                })->orWhere(function ($q) use ($cityId) {
                    $q->where('role', 'Mitra')
                        ->whereHas('mitra', function ($q) use ($cityId) {
                            $q->where('isOpen', true)
                                ->where('disable', false)
                                ->whereHas('district', fn($dq) => $dq->where('cityId', $cityId));
                        });
                });
            })
            ->groupBy('productId')
            ->get()
            ->keyBy('productId');

        $avgStok = $avgStokRows->map(fn($row) => $row->avg_stock);

        // Step 2: Ambil semua penyedia yg cocok (dengan eager loading biar efisien)
        $details = productDetail::with(['user.mitra.district', 'user.district', 'product'])
            ->whereIn('productId', Product::where('productType', 'Barang jadi')->get()->map(function ($item) {
                return $item->id;
            }))
            ->where('stock', '>', 0)
            ->whereHas('user', function ($q) use ($cityId) {
                $q->where(function ($q) use ($cityId) {
                    $q->where('role', 'Pak Telang')
                        ->whereHas('district', fn($dq) => $dq->where('cityId', $cityId));
                })->orWhere(function ($q) use ($cityId) {
                    $q->where('role', 'Mitra')
                        ->whereHas('mitra', function ($q) use ($cityId) {
                            $q->where('isOpen', true)
                                ->where('disable', false)
                                ->whereHas('district', fn($dq) => $dq->where('cityId', $cityId));
                        });
                });
            })
            ->get();

        // Step 3: Group berdasarkan user dan cari penyedia yang punya semua produk dengan stok ≥ rata-rata
        $grouped = $details->groupBy('userId');

        // Step 1: Cari provider ideal (stok semua produk >= rata-rata)
        $validProvider = $grouped->first(function ($items) use ($avgStok, $productIds) {
            $stocks = $items->keyBy('productId');

            foreach ($productIds as $pid) {
                if (!isset($stocks[$pid]) || $stocks[$pid]->stock < $avgStok[$pid]) {
                    return false;
                }
            }

            return true;
        });

        // Step 2: Kalau gak ada yang ideal, cari yang punya semua produk (stok berapapun)
        if (!$validProvider) {
            $validProvider = $grouped->first(function ($items) use ($productIds) {
                $stocks = $items->keyBy('productId');

                foreach ($productIds as $pid) {
                    if (!isset($stocks[$pid])) {
                        return false;
                    }
                }

                return true;
            });
        }

        // Step 3: Kalau masih gak ada, cari yang punya produk paling banyak
        if (!$validProvider) {
            $validProvider = $grouped->sortByDesc(function ($items) use ($productIds) {
                return $items->whereIn('productId', $productIds)->count();
            })->first();
        }

        $validProviderId = $validProvider?->first()?->userId;


        // Step 4: Jika ditemukan, siapkan produk dan tampilkan
        if ($validProviderId) {
            $provider = $details->firstWhere('userId', $validProviderId)->user;

            $address = $this->getFullAdress();

            $stock = productDetail::with('product')
                ->where('userId', $provider->id)
                ->where('stock', '>', 0)
                ->whereRelation('product', 'productType', 'Barang jadi')
                ->get();

            $products = Product::where('productType', 'Barang jadi')->get()->map(function ($item) use ($provider) {
                $stockProduct = productDetail::where('userId', $provider->id)->where('productId', $item->id)->first()?->stock;
                return [
                    ...$item->toArray(),
                    'productPhoto' => json_decode($item->productPhoto),
                    'productStock' => $stockProduct ?? 0,
                ];
            });
            $reset = Session::get('reset');
            Session::remove('reset');
            return Inertia::render('Customer/Transaksi/create', compact('products', 'address', 'selectedProduct','reset'));
        }

        return back()->with('info', 'Saat ini pemasaran product belum tersedia di daerah anda');
    }


    public function show($id)
    {
        $transactions = Transaksi::with(['detailTransaksis.product'])->find($id);
        if ($transactions) {
            $district = $transactions->district;
            $city = $district->city;
            $province = $city->province;
            $transactions = [...$transactions->toArray(), 'address' => [
                'address' => $transactions->address,
                'postalCode' => $transactions->postalCode,
                'districtName' => $district?->districtName,
                'cityName' => $city->cityName,
                'province' => $province->province,
            ], 'Total' => DetailTransaksi::where('transaksiId', $transactions->id)->sum('subTotal')];
            if ($transactions['status'] === 'Selesai') {
                return Inertia::render('Customer/Transaksi/riwayat', compact('transactions'));
            };

            return Inertia::render('Customer/Transaksi/show', compact('transactions'));
        };
        abort(404);
    }

    public function payment($id)
    {
        $transaction = Transaksi::with(['detailTransaksis.product'])->where('id', $id)->where('status', 'Menunggu Pembayaran')->first();
        if ($transaction) {
            $transaction = [...$transaction->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $transaction->id)->sum('subTotal')];
            if (!$transaction['snapToken']) {
                $ress = Snap::createTransaction([
                    "transaction_details" => [
                        "order_id" => $transaction['id'],
                        "gross_amount" => $transaction['ongkir'] ? $transaction['Total']  + $transaction['ongkir'] : $transaction['Total']
                    ],
                ]);
                Transaksi::whereId($id)->update(['snapToken' => $ress->token]);
                $transaction = [...$transaction, 'snapToken' => $ress->token];
            }
            return Inertia::render('Customer/Transaksi/payment', compact('transaction'));
        };
        abort(404);
    }

    public function store(Request $request)
    {
        $detailTransaksi = collect($request->input('data'))->map(function ($item) {
            return [
                'amount' => $item['amount'],
                'subTotal' => $item['subTotal'],
                'productId' => $item['productId'],
            ];
        });
        $providers = User::whereIn('role', ['Pak Telang', 'Mitra'])
            ->orWhere(function ($query) {
                $query->whereHas('mitra', function ($query) {
                    $query->where('isOpen', true);  // Cek apakah mitra terbuka
                });
            })
            ->get()
            ->filter(function ($provider) use ($detailTransaksi) {
                return $detailTransaksi->every(function ($item) use ($provider) {
                    $stok = productDetail::where('userId', $provider->id)
                        ->where('productId', $item['productId'])
                        ->first()?->stock ?? 0;

                    return $stok >= $item['amount'];
                });
            });
        $emails = $providers->map(function ($item) {
            return $item->email;
        });

        $user = Auth::user();

        $transaksi = Transaksi::create([
            'customerId' => $user->id,
            'status' => 'Menunggu Konfirmasi',
            'type' => 'Barang jadi',
            'address' => $user->address,
            'postalCode' => $user->postalCode,
            'districtId' => $user->districtId,
        ]);

        $transaksi->detailTransaksis()->createMany($detailTransaksi->toArray());
        Mail::bcc($emails)->send(new newTransaction(route('mitra.transaksi.show', ['id' => $transaksi->id])));

        return redirect()
            ->route('customer.transaksi.show', ['id' => $transaksi->id])
            ->with('success', 'Berhasil membuat pesanan');
    }


    public function update(Transaksi $id)
    {

        $total = $id->ongkir + DetailTransaksi::where('transaksiId', $id->id)->sum('subTotal');

        $id->update([
            'status' => 'Selesai'
        ]);

        Mutasi::create([
            'finished' => true,
            'nominal' => $total,
            'transaksiId' => $id->id,
            'type' => 'Pemasukan',
            'userId' => $id->providerId,
        ]);


        $provider = User::find($id->providerId);

        $provider->increment('saldo', $total);

        return back()->with('success', 'Pesanan berhasil diselesaikan');
    }
}
