<?php

use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('product',[ProductController::class,'index']);

Route::get('/', function () {
    return Inertia::render('Guest/LandingPage/landingPage');
})->name('home');

Route::get('konten', function () {
    return Inertia::render('Guest/Konten/Konten');
})->name('konten');

Route::get('produk', function () {
    return Inertia::render('Guest/Produk/Produk');
})->name('produk');

Route::get('donasi', function () {
    return Inertia::render('Guest/Donasi/Donasi');
})->name('donasi');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__.'/Admin.php';
