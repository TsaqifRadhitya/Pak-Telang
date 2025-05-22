<?php

namespace App\Http\Controllers;

use App\Models\DetailTransaksi;
use App\Models\konten;
use App\Models\mitra;
use App\Models\Product;
use App\Models\Transaksi;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class dashboardController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        if ($role === 'Customer') {
            $latestContent = konten::orderBy('created_at', 'desc')->limit(3)->get();
            $popularProduct = Product::select('products.id', 'products.productName', 'products.productPrice', 'products.productNetto', 'products.productUnit', 'products.productPhoto', 'products.productDescription')
                ->join('detail_transaksis', 'products.id', '=', 'detail_transaksis.productId')
                ->where('products.productType', 'Barang jadi')->where('isdeleted', false)
                ->groupBy('products.id')
                ->orderByRaw('COUNT(*) DESC')
                ->limit(1)
                ->first();
            $popularProduct->productPhoto = json_decode($popularProduct->productPhoto);
            return Inertia::render('Customer/Dashboard/dashboard', compact('latestContent', 'popularProduct'));
        } else if ($role === 'Mitra') {
            return redirect(route('mitra.dashboard'));
        } else {
            return redirect(route('admin.dashboard'));
        }
    }

    public function adminDashboard()
    {
        $saldo = User::sum('saldo');

        $months = collect(range(0, 5))->map(function ($i) {
            return Carbon::now()->subMonths($i)->startOfMonth()->format('Y-m');
        })->reverse()->values();

        $chart = $months->map(function ($month) {
            $produkJadi = Transaksi::with('detailTransaksis')
                ->where('providerId', Auth::user()->id)
                ->where('status', 'Selesai')
                ->where('type', 'Barang jadi')
                ->whereRaw("TO_CHAR(transaksis.created_at, 'YYYY-MM') = ?", [$month])
                ->get();
            $bahanBaku = Transaksi::with('detailTransaksis')
                ->where('providerId', Auth::user()->id)
                ->where('status', 'Selesai')
                ->where('type', 'Bahan Baku')
                ->whereRaw("TO_CHAR(transaksis.created_at, 'YYYY-MM') = ?", [$month])
                ->get();
            return [
                'bulan' => Carbon::createFromFormat('Y-m', $month)->translatedFormat('F'),
                'Produk Jadi' => $produkJadi->flatMap->detailTransaksis->sum('subTotal') ?? 0 + $produkJadi->ongkir ?? 0,
                'Bahan Baku' => $bahanBaku->flatMap->detailTransaksis->sum('subTotal') ?? 0 + $produkJadi->ongkir ?? 0,
            ];
        });

        $lastMonth = Carbon::now()->subMonth()->startOfMonth()->format('m');
        $thisMonth = Carbon::now()->format('m');

        $productSold = [
            'thisMonth' => Transaksi::with('detailTransaksis')->where('providerId', Auth::user()->id)->whereRaw("TO_CHAR(transaksis.created_at, 'MM') = ?", [$thisMonth])->get()->flatMap->detailTransaksis->sum('amount'),
            'lastMonth' => Transaksi::with('detailTransaksis')->where('providerId', Auth::user()->id)->whereRaw("TO_CHAR(transaksis.created_at, 'MM') = ?", [$lastMonth])->get()->flatMap->detailTransaksis->sum('amount')
        ];

        $mitra = [
            'thisMonth' => count(array_unique(mitra::whereRaw("TO_CHAR(mitras.created_at, 'MM') = ?", [$thisMonth])->get()->map(fn($m) =>
            $m->district->city->cityName)->toArray())),
            'lastMonth' => count(array_unique(mitra::whereRaw("TO_CHAR(mitras.created_at, 'MM') = ?", [$lastMonth])->get()->map(fn($m) =>
            $m->district->city->cityName)->toArray()))
        ];

        return Inertia::render('Pak Telang/Dashboard/dashboard', compact('saldo', 'chart', 'productSold','mitra'));
    }

    public function mitraDashboard()
    {
        $statusToko = Auth::user()->mitra?->isOpen;
        return Inertia::render('Mitra/Dashboard/dashboard', compact('statusToko'));
    }
}
