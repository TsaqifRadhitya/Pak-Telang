<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\productDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {

        if (Auth::user() == null) {
            $product = Product::where('productType', 'like', 'siap pakai')->get();
            return Inertia::render('Guest/Produk/Produk', compact('product'));
        }
        if (Auth::user()->role === 'Mitra') {
            $products = Product::whereisdeleted(false)->where('productType', '=', 'siap pakai')->get()->map(function ($item) {
                $item->productPhoto = json_decode($item->productPhoto);
                return $item;
            });
            return Inertia::render('Mitra/Produk/produk', compact('products'));
        } else if (Auth::user()->role === 'Pak Telang') {
            $products = Product::whereisdeleted(false)->get()->map(function ($item) {
                $item->productPhoto = json_decode($item->productPhoto);
                return $item;
            });
            return Inertia::render('Pak Telang/Produk/produk', compact('products'));
        } else {
            $product = Product::where('productType', 'like', 'siap pakai')->get();
            return Inertia::render('Guest/Produk/Produk', compact('product'));
        }
    }

    public function customerProductDetail($id)
    {
        $products = Product::where('productType', '=', 'siap pakai')->where('id', '!=', $id)->get();
        $productDetail = Product::whereId($id)->first();
        return Inertia::render('Guest/Produk/produkDetail', compact('products', 'productDetail'));
    }

    public function store(Request $request)
    {
        $result =  $request->validate([
            'productName' => ['required', 'string'],
            'productPrice' => ['required', 'numeric', 'min:1'],
            'productType' => ['required', 'string', Rule::in(['setengah jadi', 'siap pakai'])],
            'productPhoto' => ['array', 'required', 'min:1'],
            'productDescription' => ['string', 'required']
        ]);

        $result['productPhoto'] = json_encode($result['productPhoto']);

        Product::create($result);
    }

    public function create() {}


    public function show($product)
    {
        $data = Product::whereId($product)->first();
        $data->productPhoto = json_decode($data->productPhoto);
    }

    public function update(Request $request, $product)
    {
        $result =  $request->validate([
            'productName' => ['required', 'string'],
            'productPrice' => ['required', 'numeric', 'min:1'],
            'productType' => ['required', 'string', Rule::in(['setengah jadi', 'siap pakai'])],
            'productPhoto' => ['array', 'required', 'min:1'],
            'productDescription' => ['string', 'required']
        ]);

        $result['productPhoto'] = json_encode($result['productPhoto']);

        Product::whereId($product)->update($result);
    }

    public function destroy($product)
    {
        Product::whereId($product)->update(['isdeleted' => true]);
    }

    public function edit($product)
    {
        $data = Product::whereId($product)->first();
        $data->productPhoto = json_decode($data->productPhoto);
    }

    public function updateStock(Request $request, $id)
    {
        $request->validate(['stock' => ['required', 'numeric']]);
        productDetail::updateOrInsert(
            ['userId' => Auth::user()->id, 'productId' => $id],
            ['stock' => $request->input('stock')]
        );
    }

    public function showStock()
    {
        $user = Auth::user();
        $productStock = productDetail::whereUserid($user->id)->get();
        if ($user->role === 'Pak Telang') {
        } else {
        }
    }

    public function disableProduct($id)
    {
        productDetail::whereProductid($id)->update(['disable' => true]);
    }
}
