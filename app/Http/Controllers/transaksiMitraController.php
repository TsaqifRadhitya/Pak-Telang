<?php

namespace App\Http\Controllers;

use App\Models\DetailTransaksi;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class transaksiMitraController extends Controller
{
    public function index()
    {
        $pesananMasuk = [];
        $Dipesan = Transaksi::with('detailTransaksis.product')->where('status', '!=', 'Selesai')->where('customerId', Auth::user()->id)->get()->map(function ($item) {
            return [...$item->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $item->id)->sum('subTotal')];
        });
        $pesananDiterima = Transaksi::with('detailTransaksis.product')->where('providerId', Auth::user()->id)->get()->map(function ($item) {

            return [...$item->toArray(), 'address' => $this->getFullAdress($item)];
        });
        $Riwayat = Transaksi::with('detailTransaksis.product')->where('providerId', Auth::user()->id)->orWhere('customerId', Auth::user()->id)->where('status', 'Selesai')->get()->map(function ($item) {
            return [...$item->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $item->id)->sum('subTotal')];
        });
        return Inertia::render('Mitra/Transaksi/index', compact('pesananMasuk', 'Dipesan', 'pesananDiterima', 'Riwayat'));
    }

    private function getFullAdress(Transaksi $transaksi)
    {

        $district = $transaksi->district()->first();
        $city = $district->city()->first();
        $province = $city->province()->first();
        return [
            'address' => $transaksi->address,
            'postalCode' =>  $transaksi->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }

    public function create(Request $request) {}

    public function show($id)
    {
        $transaction = Transaksi::with('detailTransaksis.product')->where('id', $id)->where('type', 'Barang jadi')->first();

        if ($transaction?->status === "Menunggu Pembayaran") {
            return redirect(route('mitra.order bahan.payment', ["id" => $id]));
        } else if ($transaction) {
            if(!$transaction->providerId){
                $section = "Pesanan Masuk";
            }else if($transaction->status !== "Selesai"){
                $section = "Pesanan Diterima";
            }else {
                $section = "Riwayat";
            }
            $transaction = [
                ...$transaction->toArray(),
                "Total" => DetailTransaksi::where('transaksiId', $transaction->id)->sum('subTotal'),
                "user" => User::find($transaction->customerId),
            ];
            return Inertia::render('Mitra/Transaksi/show', compact('section', 'transaction'));
        }
        abort(404);
        return Inertia::render('Mitra/Transaksi/show');
    }

    public function store(Request $request) {}

    public function update($id) {}
}
