<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\messageController;
use App\Http\Controllers\mitraController;
use App\Http\Controllers\ProductController;
use App\Models\kontent;
use App\Models\Product;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $product = Product::where('productType','=','Barang jadi')->get()->each(function($e){
        $e->productPhoto = json_decode($e->productPhoto);
    });
    $kontent = kontent::all();
    return Inertia::render('Guest/LandingPage/landingPage',compact('product','kontent'));
})->name('home');

Route::get('konteneditor',function(){
    return Inertia::render('Pak Telang/Konten/kontenEditor');
});


Route::get('konten', function () {
    return Inertia::render('Guest/Konten/Konten');
})->name('konten');

Route::prefix('produk')->group(function(){
    Route::get('/', [ProductController::class,'landingPageProduct'])->name('produk');
Route::get('{id}', [ProductController::class,'customerProductDetail'])->name('produk.detail');
});


Route::get('donasi', function () {
    return Inertia::render('Guest/Donasi/Donasi');
})->name('donasi');

Route::middleware('auth')->group(function () {
    Route::get('mou',[mitraController::class,'mou'])->name('mou');
    Route::get('/chat',[messageController::class,'allPerson'])->name('chat.index');
    Route::get('/chat/{id}',[messageController::class,'getChatRoom'])->name('chat.create');
    Route::post('/chat/{id}',[messageController::class,'pustChat'])->name('chat.store');
    Route::get('dashboard', [dashboardController::class,'index'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/Admin.php';
require __DIR__ . '/Customer.php';
require __DIR__ . '/Mitra.php';


