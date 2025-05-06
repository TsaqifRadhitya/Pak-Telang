<?php

namespace App\Http\Controllers;

use App\Models\DetailTransaksi;
use App\Models\Mutasi;
use App\Models\Product;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class bahanBakuController extends Controller
{
    public function index()
    {
        $products = Product::where('productType', 'Bahan Baku')->whereRelation('productStocks', 'stock', '>', 0)->get()->map(function ($product) {
            $product->productPhoto = json_decode($product->productPhoto);
            return $product;
        });
        return Inertia::render('Mitra/Order Bahan/index', compact('products'));
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
        return Inertia::render('Mitra/Order Bahan/create', compact('products', 'selectedProduct', 'address', 'addressProvider'));
    }

    public function payment($id)
    {
        $transaction = Transaksi::with('detailTransaksis.product')->where('id', $id)->where('status', 'Menunggu Pembayaran')->first();
        if ($transaction) {
            $transaction = [
                ...$transaction->toArray(),
                "Total" => DetailTransaksi::where('transaksiId', $transaction->id)->sum('subTotal'),
                'address' => $this->getFullAdress(User::find($transaction->customerId)),
            ];

            if (!$transaction['snapToken']) {
                Config::$serverKey = env("VITE_MIDTRANS_SERVER_KEY");
                Config::$isProduction = false;
                $ress = Snap::createTransaction([
                    "transaction_details" => [
                        "order_id" => $transaction['id'],
                        "gross_amount" => $transaction['Total']  + $transaction['ongkir']
                    ]
                ]);
                Transaksi::whereId($id)->update(['snapToken' => $ress->token]);
                $transaction = [...$transaction, 'snapToken' => $ress->token];
            }
            return Inertia::render('Mitra/Order Bahan/payment', compact('transaction'));
        }
        abort(404);
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
                "Total" => DetailTransaksi::where('transaksiId', $transaction->id)->sum('subTotal'),
            ];
            return Inertia::render('Mitra/Transaksi/show', compact('section', 'transaction'));
        }
        abort(404);
    }

    public function storeWithEwallet(Request $request, int $total)
    {
        $user = Auth::user();

        $user->update([
            'saldo' => $user->saldo - $total
        ]);


        $transaksi = Transaksi::create([
            'customerId' => $user->id,
            'status' => 'Menunggu Konfirmasi',
            'type' => 'Bahan Baku',
            'address' => $user->address,
            'postalCode' => $user->postalCode,
            'districtId' => $user->districtId,
            'ongkir' => $request->ongkir,
            'metodePengiriman' => $request->metodePengiriman,
            'providerId' => User::where('role', 'Pak Telang')->first()->id
        ]);

        $detailTransaksi = collect($request->input('data'))->map(function ($item) {
            return [
                'amount' => $item['amount'],
                'subTotal' => $item['subTotal'],
                'productId' => $item['productId'],
            ];
        });

        $transaksi->detailTransaksis()->createMany($detailTransaksi->toArray());

        Mutasi::create([
            'finished' => true,
            'type' => 'Pengeluaran',
            'userId' => $user->id,
            'nominal' => $total,
            'transaksiId' => $transaksi->id
        ]);

        return redirect()
            ->route('mitra.order bahan.show', ['id' => $transaksi->id])
            ->with('success', 'Berhasil membuat pesanan dengan metode pembayaran E-Wallet');
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $total = array_sum(array_column($request->input('data'), 'subTotal')) + $request->ongkir;
        if ($user->saldo >= $total) {
            return $this->storeWithEwallet($request, $total);
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
            'providerId' => User::where('role', 'Pak Telang')->first()->id
        ]);

        $detailTransaksi = collect($request->input('data'))->map(function ($item) {
            return [
                'amount' => $item['amount'],
                'subTotal' => $item['subTotal'],
                'productId' => $item['productId'],
            ];
        });

        $transaksi->detailTransaksis()->createMany($detailTransaksi->toArray());

        return redirect()
            ->route('mitra.order bahan.payment', ['id' => $transaksi->id])
            ->with('success', 'Berhasil membuat pesanan');
    }

    public function update($id) {}
}
