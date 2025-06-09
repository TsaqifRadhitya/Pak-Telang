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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class C_OrderBahan extends Controller
{
    public function index()
    {
        $products = Product::where('productType', 'Bahan Baku')->whereRelation('productStocks', 'stock', '>', 0)->get()->map(function ($product) {
            $product->productPhoto = json_decode($product->productPhoto);
            return $product;
        });
        return Inertia::render('Mitra/Order Bahan/V_HalOrderBahan', compact('products'));
    }

    public function create(Request $request)
    {
        $products = Product::with('productStocks')->where('productType', 'Bahan Baku')->whereRelation('productStocks', 'stock', '>', 0)->get()->map(function ($product) {
            $product->productPhoto = json_decode($product->productPhoto);
            return [...$product->toArray(), "productStock" => $product->toArray()['product_stocks'][0]['stock']];
        });
        $selectedProduct = $request->id;
        $address = $this->getFullAdress(Auth::user());
        $addressProvider = $this->getFullAdress(User::where('role', 'Pak Telang')->first());
        return Inertia::render('Mitra/Order Bahan/V_HalDetailOrder', compact('products', 'selectedProduct', 'address', 'addressProvider'));
    }

    public function payment($id)
    {
        $transaction = Transaksi::with('detailTransaksis.product')->where('id', $id)->first();
        if ($transaction->status === "Menunggu Pembayaran") {
            $transaction = [
                ...$transaction->toArray(),
                "Total" => DetailTransaksi::where('transaksiId', $transaction->id)->sum('subTotal'),
                'address' => $this->getFullAdress(User::find($transaction->customerId)),
            ];

            if (!$transaction['snapToken']) {
                Config::$serverKey = env("VITE_MIDTRANS_SERVER_KEY");
                Config::$isProduction = false;
                $time = now();
                $ress = Snap::createTransaction([
                    "transaction_details" => [
                        "order_id" => $transaction['id'],
                        "gross_amount" => $transaction['Total']  + $transaction['ongkir']
                    ],
                    "callbacks" => [
                        "finish" => route('mitra.transaksi.show', ["id" => $id]),
                        "error" => route('mitra.transaksi.show', ["id" => $id])

                    ],
                    "expiry" =>  [
                        "start_time" => $time->format('Y-m-d H:i:s O'),
                        "unit" => "hour",
                        "duration" => 12
                    ]
                ]);
                Transaksi::whereId($id)->update(['snapToken' => $ress->token, 'updated_at' => $time]);
                $transaction = [...$transaction, 'snapToken' => $ress->token];
            }
            return Inertia::render('Mitra/Order Bahan/V_HalPembayaranOrder', compact('transaction'));
        } else if ($transaction) {
            return redirect()->route('mitra.order bahan.show', ['id' => $id]);
        }
        abort(404);
    }

     private function getFullTransactionAdress(Transaksi $transaksi)
    {

        $district = $transaksi->district;
        $city = $district->city;
        $province = $city->province;
        return [
            'address' => $transaksi->address,
            'postalCode' =>  $transaksi->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }

    private function getFullAdress(User $user)
    {
        $district = $user->district()->first();
        $city = $district?->city()->first();
        $province = $city?->province()->first();

        return [
            'address' => $user->address,
            'postalCode' =>  $user->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city?->cityName,
            'province' => $province?->province,
        ];
    }

    public function show($id)
    {
        $transaction = Transaksi::with('detailTransaksis.product')->where('id', $id)->where('type', 'Bahan Baku')->first();

        if ($transaction?->status === "Menunggu Pembayaran") {
            return redirect(route('mitra.order bahan.payment', ["id" => $id]));
        } else if ($transaction) {
            $section = ($transaction->type === "Bahan Baku" && $transaction->status !== "Selesai") ? "Dipesan" : "Riwayat";
            $transaction = [
                ...$transaction->toArray(),
                'address' => $this->getFullTransactionAdress($transaction),
                "Total" => DetailTransaksi::where('transaksiId', $transaction->id)->sum('subTotal'),
            ];
            return Inertia::render('Mitra/Transaksi/show', compact('section', 'transaction'));
        }
        abort(404);
    }

    public function storeWithEwallet(Request $request, int $total)
    {
        $user = Auth::user();

        $data = collect($request->data);

        // Ambil semua produk yang dibutuhkan sekaligus
        $productDetails = productDetail::whereIn('productId', $data->pluck('productId'))
            ->get()
            ->keyBy('productId');

        // Validasi stok
        foreach ($data as $item) {
            $product = $productDetails[$item['productId']] ?? null;
            if (!$product || $item['amount'] > $product->stock) {
                return redirect()->back()->with('error', 'Terdapat pemesanan yang tidak melebihi stock');
            }
        }

        // Update saldo user
        $user->decrement('saldo', $total);

        // Buat transaksi
        $provider = User::where('role', 'Pak Telang')->whereNotNull('address')->first();
        if (!$provider) {
            return redirect()->back()->withErrors(['Provider tidak ditemukan.']);
        }

        $transaksi = Transaksi::create([
            'customerId' => $user->id,
            'status' => 'Sedang Diproses',
            'type' => 'Bahan Baku',
            'address' => $user->address,
            'postalCode' => $user->postalCode,
            'districtId' => $user->districtId,
            'ongkir' => $request->ongkir,
            'metodePengiriman' => $request->metodePengiriman,
            'providerId' => $provider->id
        ]);

        // Buat detail transaksi
        $detailTransaksi = $data->map(function ($item) {
            return [
                'amount' => $item['amount'],
                'subTotal' => $item['subTotal'],
                'productId' => $item['productId'],
            ];
        });

        $transaksi->detailTransaksis()->createMany($detailTransaksi->toArray());

        // Update stok produk
        foreach ($data as $item) {
            $product = $productDetails[$item['productId']];
            $product->decrement('stock', $item['amount']);
        }

        // Catat mutasi
        Mutasi::create([
            'finished' => true,
            'type' => 'Pengeluaran',
            'userId' => $user->id,
            'nominal' => $total,
            'transaksiId' => $transaksi->id
        ]);

        Mail::to($provider->email)->send(new newTransaction(route('admin.transaksi.show', ['id' => $transaksi->id])));

        return redirect()
            ->route('mitra.order bahan.show', ['id' => $transaksi->id])
            ->with('success', 'Berhasil membuat pesanan dengan metode pembayaran E-Wallet');
    }


    public function store(Request $request)
    {
        $user = Auth::user();

        $data = collect($request->data);

        // Ambil semua product detail yang dibutuhkan dalam satu query
        $productDetails = productDetail::whereIn('productId', $data->pluck('productId'))->get()->keyBy('productId');

        // Validasi stok
        foreach ($data as $item) {
            $product = $productDetails[$item['productId']] ?? null;
            if (!$product || $item['amount'] > $product->stock) {
                return redirect()->back()->with('error', 'Terdapat pemesanan yang tidak melebihi stock');
            }
        }

        $total = $data->sum('subTotal') + $request->ongkir;

        // Jika saldo cukup, langsung proses lewat e-wallet
        if ($user->saldo >= $total) {
            return $this->storeWithEwallet($request, $total);
        }

        // Buat transaksi
        $provider = User::where('role', 'Pak Telang')->whereNotNull('address')->first();
        if (!$provider) {
            return redirect()->back()->withErrors(['Tidak ada provider yang tersedia saat ini.']);
        }

        $transaksi = Transaksi::create([
            'customerId' => $user->id,
            'status' => 'Menunggu Pembayaran',
            'type' => 'Bahan Baku',
            'address' => $user->address,
            'postalCode' => $user->postalCode,
            'districtId' => $user->districtId,
            'ongkir' => $request->ongkir,
            'metodePengiriman' => $request->metodePengiriman,
            'providerId' => $provider->id
        ]);

        // Tambahkan detail transaksi
        $detailTransaksi = $data->map(function ($item) {
            return [
                'amount' => $item['amount'],
                'subTotal' => $item['subTotal'],
                'productId' => $item['productId'],
            ];
        });

        $transaksi->detailTransaksis()->createMany($detailTransaksi->toArray());

        // Update stok setelah transaksi berhasil dibuat
        foreach ($data as $item) {
            $product = $productDetails[$item['productId']];
            $product->decrement('stock', $item['amount']);
        }

        return redirect()
            ->route('mitra.order bahan.payment', ['id' => $transaksi->id])
            ->with('success', 'Berhasil membuat pesanan');
    }


    public function update(Transaksi $id)
    {

        $id->update([
            'status' => 'Selesai'
        ]);

        return back()->with('success', 'Berhasil menyelesaikan trannsaksi');
    }
}
