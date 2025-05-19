<?php

namespace App\Http\Controllers;

use App\Models\donasi;
use App\Models\penyaluranDonasi;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Number;
use Midtrans\Config;
use Midtrans\Snap;
use Symfony\Component\Uid\Ulid;

class donasiController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $role = Auth::user()->role;
            if ($role === "Pak Telang") {
            } else {
                return Inertia::render('Guest/Donasi/Donasi');
            }
        }
        return Inertia::render('Guest/Donasi/Donasi');
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
            "expiry" =>  [
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
        ])->with('info', 'Silahkan Mengirimkan Nominal Donasi');
    }


    public function show($id)
    {
        $donasi = donasi::find($id);

        if ($donasi->status === 'paid') {
            return Inertia::render('Guest/Donasi/Donasi', ['snapToken' => $donasi->snapToken])->with('success', 'Nominal Donasi Berhasil Diterima');
        }
        return Inertia::render('Guest/Donasi/Donasi', ['snapToken' => $donasi->snapToken]);
    }

    public function penyaluranDonasi(Request $request){
        penyaluranDonasi::create([
            'jumlahProduk' => $request->jumlahProduk,
            'nominal' => $request->nominal
        ]);

        return back()->with('success','Berhasil Menyalurkan Donasi dengan Nominal '.Number::format($request->nominal).".");
    }
}
