<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\messageController;
use App\Http\Controllers\ProductController;
use App\Models\kontent;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $product = Product::all();
    $kontent = kontent::all();
    return Inertia::render('Guest/LandingPage/landingPage',compact('product','kontent'));
})->name('home');


Route::get('konten', function () {
    return Inertia::render('Guest/Konten/Konten');
})->name('konten');

Route::get('produk', function () {
    $product = Product::all();
    return Inertia::render('Guest/Produk/Produk',compact('product'));
})->name('produk');

Route::get('donasi', function () {
    return Inertia::render('Guest/Donasi/Donasi');
})->name('donasi');

Route::middleware('auth')->group(function () {
    Route::get('/chat',[messageController::class,'allPerson'])->name('chat.index');
    Route::get('/chat/{id}',[messageController::class,'getChatRoom'])->name('chat.create');
    Route::post('/chat/{id}',[messageController::class,'pustChat'])->name('chat.store');
    Route::get('dashboard', [dashboardController::class,'index'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/Admin.php';
