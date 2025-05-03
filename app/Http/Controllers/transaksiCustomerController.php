<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\productDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class transaksiCustomerController extends Controller
{
    public function index() {}

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
            $stock = productDetail::with('product')->where('userId', '=', $provider->id)->get();

            $products = $stock->map(function ($item) {
                return [...$item->product->toArray(), 'productPhoto' => json_decode($item->product->productPhoto), 'productStock' => $item->stock];
            });

            return Inertia::render('Customer/Transaksi/create', compact('products', 'selectedProduct'));
        };
        return back()->with('info', 'Saat ini pemasaran product belum tersedia di daerah anda');
    }

    public function show($id) {}

    public function store(Request $request) {
        dd($request->all());
    }

    public function update($id) {}
}
