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
        $selectedProduct = $request->id;
        if (!Auth::user()->address) {
            return redirect(route('customer.profile.edit'))->with('error', 'Harap melengkapi alamat sebelum melakuakan pemesanan');
        }
        $provider = productDetail::whereRelation('user.mitra.district', 'cityId', Auth::user()->district()->first()->cityId)->whereRelation('user.mitra', 'isOpen', true)->whereRelation('user.mitra', 'disable', false)->orderBy('stock', 'desc')->first()?->user;
        if ($provider) {
            $address = $this->getFullAdress();
            $stock = productDetail::with('product')->where('userId', '=', $provider->id)->get();

            $products = $stock->map(function ($item) {
                return [...$item->product->toArray(), 'productPhoto' => json_decode($item->product->productPhoto), 'productStock' => $item->stock];
            });

            return Inertia::render('Customer/Transaksi/create', compact('products', 'address', 'selectedProduct'));
        };
        return back()->with('info', 'Saat ini pemasaran product belum tersedia di daerah anda');
    }

    public function show($id)
    {
        $transactions = Transaksi::with(['detailTransaksis.product'])->find($id);
        if ($transactions) {
            $transactions = [...$transactions->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $transactions->id)->sum('subTotal')];
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

        return back()->with('success', 'Berhasil Menyelesaikan Pesanan');
    }
}
