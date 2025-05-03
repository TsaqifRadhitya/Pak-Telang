<?php

namespace App\Http\Controllers;

use App\Models\DetailTransaksi;
use App\Models\Product;
use App\Models\productDetail;
use App\Models\Transaksi;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class transaksiCustomerController extends Controller
{
    public function index()
    {
        $transactions = Transaksi::with(['detailTransaksis.product'])->where('customerId', Auth::user()->id)->get();
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
            } else {
                return Inertia::render('Customer/Transaksi/show', compact('transactions'));
            };
        };
        abort(404);
    }

    public function payment($id)
    {
        Config::$serverKey = env("VITE_MIDTRANS_SERVER_KEY");
        Config::$isProduction = false;
        $transaction = Transaksi::with(['detailTransaksis.product'])->where('id',$id)->where('status','Menunggu Pembayaran')->first();
        if ($transaction) {
            $transaction = [...$transaction->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $transaction->id)->sum('subTotal')];
            try {
                $ress = Snap::createTransaction([
                    "transaction_details" => [
                        "order_id" => $transaction['id'],
                        "gross_amount" => $transaction['ongkir'] ? $transaction['Total']  + $transaction['ongkir'] : $transaction['Total']
                    ]
                ]);
                Transaksi::whereId($id)->update(['snapToken' => $ress->token]);
                $transaction = [...$transaction,'snapToken' => $ress->token];
            } catch (Exception $e) {

            }
            return Inertia::render('Customer/Transaksi/payment', compact('transaction'));
        };
        abort(404);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $transaksi = Transaksi::create([
            'customerId' => $user->id,
            'status' => 'Menunggu Konfirmasi',
            'type' => 'Barang jadi',
            'address' => $user->address,
            'postalCode' => $user->postalCode,
            'districtId' => $user->districtId,
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
            ->route('customer.transaksi.show', ['id' => $transaksi->id])
            ->with('success', 'Berhasil membuat pesanan');
    }


    public function update($id) {}
}
