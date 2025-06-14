<?php

namespace App\Http\Controllers;

use App\Models\donasi;
use App\Models\konten;
use App\Models\penyaluranDonasi;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Midtrans\Config;
use Midtrans\Snap;

class C_Donasi extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $role = Auth::user()->role;
            if ($role === "Pak Telang") {
                $donasiMasuk = donasi::where('status', 'paid')->orderBy('created_at', 'desc')->get();
                $Disalurkan = penyaluranDonasi::orderBy('created_at', 'desc')->get();
                $danaTersalur = $Disalurkan->sum('nominal');
                $totalDonasi = $donasiMasuk->sum('nominal') - $danaTersalur;
                return Inertia::render('Pak Telang/Donasi/V_HalDonasiAdmin', compact('donasiMasuk', 'Disalurkan', 'danaTersalur', 'totalDonasi'));
            } else {
                $donasi = donasi::where('status', 'paid')->whereNot('pesan',null)->orderBy('created_at', 'desc')->limit(5)->get()->toArray();
                $kontenDonasi = konten::orderBy('created_at', 'desc')->limit(3)->get();
                return Inertia::render('Guest/Donasi/V_HalDonasi', compact('kontenDonasi', 'donasi'));
            }
        }
        $donasi = donasi::where('status', 'paid')->whereNot('pesan',null)->orderBy('created_at', 'desc')->limit(5)->get()->toArray();
        $kontenDonasi = konten::where('category', 'Penyaluran Donasi')->orderBy('created_at', 'desc')->limit(3)->get();
        return Inertia::render('Guest/Donasi/V_HalDonasi', compact('kontenDonasi', 'donasi'));
    }

    public function store(Request $request)
    {
        Config::$serverKey = env("VITE_MIDTRANS_SERVER_KEY");
        Config::$isProduction = false;
        $time = now();
        $data = donasi::create([
            'email' => $request->email,
            'name' => $request->name,
            'nominal' => $request->nominal,
            'pesan' => $request->pesan,
        ]);
        $ress = Snap::createTransaction([
            "transaction_details" => [
                "order_id" => $data->id,
                "gross_amount" => $data->nominal
            ],
            "callbacks" => [
                "finish" => route('donasi.show', ["id" => $data->id]),
                "error" => route('donasi.show', ["id" => $data->id])

            ],
            "expiry" => [
                "start_time" => $time->format('Y-m-d H:i:s O'),
                "unit" => "hour",
                "duration" => 12
            ]
        ]);

        $data->update(
            ['snapToken' => $ress->token]
        );

        return redirect()->route('donasi.show', [
            'id' => $data->id
        ]);
    }

    public function penyaluran(Request $request)
    {
        penyaluranDonasi::create(
            [
                'nominal' => $request->nominal,
                'jumlahProduk' => $request->jumlahProduk,
                'namaPenyaluran' => $request->namaPenyaluran
            ]
        );

        return back()->with('success', 'Berhasil menambah data penyaluran donasi');
    }

    public function show($id)
    {
        $donasi = donasi::find($id);
        if ($donasi) {
            if ($donasi->status === 'paid') {
                return redirect()->route('donasi')->with('success', 'Donasi berhasil dikirimkan');
            }
            $donasiMessage = donasi::where('status', 'paid')->orderBy('created_at', 'desc')->limit(5)->get()->toArray();
            $kontenDonasi = konten::where('category', 'Penyaluran Donasi')->orderBy('created_at', 'desc')->limit(3)->get();
            return Inertia::render('Guest/Donasi/V_HalDonasi', ['donationData' => $donasi, 'kontenDonasi' => $kontenDonasi, 'donasi' => $donasiMessage]);
        }
        abort(404);
    }
}
