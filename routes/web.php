<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\kontenController;
use App\Http\Controllers\messageController;
use App\Http\Controllers\ProductController;
use App\Models\konten;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $product = Product::where('productType', '=', 'Barang jadi')->get()->each(function ($e) {
        $e->productPhoto = json_decode($e->productPhoto);
    });
    $kontent = konten::all();
    return Inertia::render('Guest/LandingPage/landingPage', compact('product', 'kontent'));
})->name('home');

Route::prefix('konten')->group(function () {
    Route::get('/', [kontenController::class, 'viewIndex'])->name('konten');
    Route::get('{id}', [kontenController::class, 'viewShow'])->name('konten.show');
});

Route::prefix('produk')->group(function () {
    Route::get('/', [ProductController::class, 'landingPageProduct'])->name('produk');
    Route::get('{id}', [ProductController::class, 'customerProductDetail'])->name('produk.detail');
});


Route::get('donasi', function () {
    return Inertia::render('Guest/Donasi/Donasi');
})->name('donasi');

Route::middleware('auth')->group(function () {
    Route::get('/chat', [messageController::class, 'allPerson'])->name('chat.index');
    Route::get('/chat/{id}', [messageController::class, 'getChatRoom'])->name('chat.create');
    Route::post('/chat/{id}', [messageController::class, 'pustChat'])->name('chat.store');
    Route::get('dashboard', [dashboardController::class, 'index'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/Admin.php';
require __DIR__ . '/Customer.php';
require __DIR__ . '/Mitra.php';
