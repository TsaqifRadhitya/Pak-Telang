<?php

namespace App\Http\Controllers;

use App\Models\konten;
use App\Models\Product;
use App\Models\User;
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
            $popularProduct = Product::select('products.id','products.productName','products.productPrice','products.productNetto','products.productUnit','products.productPhoto','products.productDescription')
                ->join('detail_transaksis', 'products.id', '=', 'detail_transaksis.productId')
                ->where('products.productType', 'Barang jadi')->where('isdeleted',false)
                ->groupBy('products.id')
                ->orderByRaw('COUNT(*) DESC')
                ->limit(1)
                ->first();
            $popularProduct -> productPhoto = json_decode($popularProduct -> productPhoto);
            return Inertia::render('Customer/Dashboard/dashboard',compact('latestContent','popularProduct'));
        } else if ($role === 'Mitra') {
            return redirect(route('mitra.dashboard'));
        } else {
            return redirect(route('admin.dashboard'));
        }
    }

    public function adminDashboard()
    {
        $saldo = User::sum('saldo');
        return Inertia::render('Pak Telang/Dashboard/dashboard', compact('saldo'));
    }

    public function mitraDashboard()
    {
        $statusToko = Auth::user()->mitra?->isOpen;
        return Inertia::render('Mitra/Dashboard/dashboard', compact('statusToko'));
    }
}
