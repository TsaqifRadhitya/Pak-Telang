<?php

namespace App\Http\Controllers;

use App\Models\donasi;
use App\Models\konten;
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
                $donasiMasuk = donasi::where('status', 'paid')->orderBy('created_at', 'desc')->get();
                $Disalurkan = penyaluranDonasi::orderBy('created_at', 'desc')->get();
                $danaTersalur = $Disalurkan->sum('nominal');
                $totalDonasi = $donasiMasuk->sum('nominal') - $danaTersalur;
                return Inertia::render('Pak Telang/Donasi/index', compact('donasiMasuk', 'Disalurkan', 'danaTersalur', 'totalDonasi'));
            } else {
                $donasi = donasi::where('status', 'paid')->orderBy('created_at', 'desc')->limit(5)->get()->toArray();
                $kontenDonasi = konten::orderBy('created_at', 'desc')->limit(3)->get();
                return Inertia::render('Guest/Donasi/Donasi', compact('kontenDonasi', 'donasi'));
            }
        }
        $donasi = donasi::where('status', 'paid')->orderBy('created_at', 'desc')->limit(5)->get()->toArray();
        $kontenDonasi = konten::where('category', 'Penyaluran Donasi')->orderBy('created_at', 'desc')->limit(3)->get();
        return Inertia::render('Guest/Donasi/Donasi', compact('kontenDonasi', 'donasi'));
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
            $donasiMessage = donasi::where('status', 'paid')->orderBy('created_at', 'desc')->limit(5)->get()->toArray();
            $kontenDonasi = konten::where('category', 'Penyaluran Donasi')->orderBy('created_at', 'desc')->limit(3)->get();
            if ($donasi->status === 'paid') {
                return Inertia::render('Guest/Donasi/Donasi', compact('kontenDonasi'));
            }
            return Inertia::render('Guest/Donasi/Donasi', ['snapToken' => $donasi->snapToken, 'kontenDonasi' => $kontenDonasi, 'donasi' => $donasiMessage]);
        }
        abort(404);
    }

    public function penyaluranDonasi(Request $request)
    {
        penyaluranDonasi::create([
            'jumlahProduk' => $request->jumlahProduk,
            'nominal' => $request->nominal
        ]);
        return back()->with('success', 'Berhasil Menyalurkan Donasi dengan Nominal ' . Number::format($request->nominal) . ".");
    }
}
