<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\productDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Nette\Utils\Arrays;

class ProductController extends Controller
{

    public function landingPageProduct()
    {
        $product = Product::where('productType', 'like', 'Barang jadi')->where('isdeleted',false)->get()->each(function ($e) {
            $e->productPhoto = json_decode($e->productPhoto);
        });
        return Inertia::render('Guest/Produk/Produk', compact('product'));
    }

    public function index()
    {
        if (Auth::user()->role === 'Mitra') {
            $products = Product::whereisdeleted(false)->where('productType', '=', 'Barang jadi')->get()->map(function ($item) {
                $item->productPhoto = json_decode($item->productPhoto);
                return [...$item->attributesToArray(), 'productStock' => $item->productStocks()->where('userId', '=', Auth::user()->id)->first()?->stock ?? 0];
            });
            return Inertia::render('Mitra/Produk/produk', compact('products'));
        } else {
            $products = Product::whereisdeleted(false)->get()->map(function ($item) {
                $item->productPhoto = json_decode($item->productPhoto);
                return [...$item->attributesToArray(), 'productStock' => $item->productStocks()->where('userId', '=', Auth::user()->id)->first()?->stock ?? 0];
            });
            return Inertia::render('Pak Telang/Produk/produk', compact('products'));
        }
    }

    public function customerProductDetail($id)
    {
        $products = Product::where('productType', '=', 'Barang jadi')->where('id', '!=', $id)->get()->each(function ($e) {
            $e->productPhoto = json_decode($e->productPhoto);
        });;
        $productDetail = Product::whereId($id)->first();
        $productDetail->productPhoto = json_decode($productDetail->productPhoto);
        return Inertia::render('Guest/Produk/produkDetail', compact('products', 'productDetail'));
    }

    public function store(Request $request)
    {
        $result =  $request->validate([
            'productName' => ['required', 'string'],
            'productPrice' => ['required', 'numeric', 'min:1'],
            'productType' => ['required', 'string', Rule::in(['Bahan Baku', 'Barang jadi'])],
            'productPhoto' => ['array', 'required', 'min:1'],
            'productDescription' => ['string', 'required'],
            'productNetto' => ['required', 'numeric'],
            'productUnit' => ['required']
        ]);

        $result['productPhoto'] = json_encode($result['productPhoto']);

        $result = Product::create($result);
        productDetail::create([
            'productId' => $result->id,
            'stock' => $request->input('productStock'),
            'userId' => Auth::user()->id
        ]);
        return back()->with('success','Product Berhasil Ditambahkan !');
    }

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
            'productType' => ['required', 'string', Rule::in(['Bahan Baku', 'Barang jadi'])],
            'productPhoto' => ['required'],
            'productDescription' => ['string', 'required'],
            'productNetto' => ['required', 'numeric'],
            'productUnit' => ['required']
        ]);
        $result['productPhoto'] = json_encode($result['productPhoto']);
        Product::whereId($product)->update($result);
        $productDetail = productDetail::where('productId', '=', $product)->where('userId', '=', Auth::user()->id)->update([
            'stock' => $request->input('productStock')
        ]);

        if (!$productDetail) {
            productDetail::create([
                'stock' => $request->input('productStock'),
                'productId' => $product,
                'userId' => Auth::user()->id
            ]);
        }
        return back()->with('success','Product Berhasil Diperbarui !');
    }

    public function destroy($product)
    {
        Product::whereId($product)->update(['isdeleted' => true]);
        return back()->with('success','Product Berhasil Dihapus !');
    }

    public function updateStock(Request $request, $id)
    {
        $request->validate(['productStock' => ['required', 'numeric']]);
        $product_detail = productDetail::where('userId', '=', Auth::user()->id)->where('productId', '=', $id)->first();
        if ($product_detail === null) {
            productDetail::create(
                ['stock' => $request->input('productStock'), 'productId' => $id, 'userId' => Auth::user()->id]
            );
        } else {
            $product_detail->update(['stock' => $request->input('productStock')]);
        }
        return back()->with('success','Stock Product Berhasil Diperbarui !');
    }
}
