<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class bahanBakuController extends Controller
{
    public function index()
    {
        $products = Product::where('productType', 'Bahan Baku')->whereRelation('productStocks', 'stock', '>', 0)->get()->map(function ($product) {
            $product->productPhoto = json_decode($product->productPhoto);
            return $product;
        });
        return Inertia::render('Mitra/Order Bahan/index', compact('products'));
    }

    public function create(Request $request)
    {
        $products = Product::with('productStocks')->where('productType', 'Bahan Baku')->whereRelation('productStocks', 'stock', '>', 0)->get()->map(function ($product) {
            $product->productPhoto = json_decode($product->productPhoto);
            return [...$product->toArray(), "productStock" => $product->toArray()['product_stocks'][0]['stock']];
        });
        $selectedProduct = $request->id;
        $address = $this->getFullAdress(Auth::user());
        $addressProvider = $this->getFullAdress(User::where('role', 'Pak Telang')->first());
        return Inertia::render('Mitra/Order Bahan/create', compact('products', 'selectedProduct', 'address', 'addressProvider'));
    }

    private function getFullAdress(User $user)
    {

        $district = $user->district()->first();
        $city = $district->city()->first();
        $province = $city->province()->first();
        return [
            'address' => $user->address,
            'postalCode' =>  $user->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }

    public function show($id) {}

    public function store(Request $request) {}

    public function update($id) {}
}
