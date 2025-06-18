<?php

use App\Http\Controllers\C_Dashboard;
use App\Http\Controllers\C_Donasi;
use App\Http\Controllers\C_Konten;
use App\Http\Controllers\C_Midtrans;
use App\Http\Controllers\C_Product;
use App\Http\Controllers\C_RajaOngkir;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/midtrans/callback', [C_Midtrans::class, 'callback'])->name('midtrans.callback');
Route::post('/midtrans/manual', [C_Midtrans::class, 'manualCallback'])->name('midtrans.callback.manual');

Route::get('/', function () {
    $product = Product::where('productType', '=', 'Barang jadi')->where('isdeleted', false)->get()->each(function ($e) {
        $e->productPhoto = json_decode($e->productPhoto);
    });
    $reset = !Auth::check();
    return Inertia::render('Guest/LandingPage/V_HalLandingPage', compact('product', 'reset'));
})->name('home');

Route::prefix('konten')->group(function () {
    Route::get('/', [C_Konten::class, 'viewIndex'])->name('konten');
    Route::get('{id}', [C_Konten::class, 'viewShow'])->name('konten.show');
});

Route::prefix('produk')->group(function (): void {
    Route::get('/', [C_Product::class, 'landingPageProduct'])->name('produk');
    Route::get('{id}', [C_Product::class, 'customerProductDetail'])->name('produk.detail');
});

Route::prefix('donasi')->group(function () {
    Route::get('/', [C_Donasi::class, 'index'])->name('donasi');
    Route::post('/', [C_Donasi::class, 'store'])->name('donasi.store');
    Route::get('{id}', [C_Donasi::class, 'show'])->name('donasi.show');
});

Route::middleware('auth')->group(function () {
    // Route::get('/chat', [messageController::class, 'allPerson'])->name('chat.index');
    // Route::get('/chat/{id}', [messageController::class, 'getChatRoom'])->name('chat.create');
    // Route::post('/chat/{id}', [messageController::class, 'pustChat'])->name('chat.store');
    Route::get('dashboard', [C_Dashboard::class, 'index'])->name('dashboard');
    Route::get('/rajaongkir', [C_RajaOngkir::class, 'index'])->name('rajaongkir');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/Admin.php';
require __DIR__ . '/Customer.php';
require __DIR__ . '/Mitra.php';
