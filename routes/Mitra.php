<?php

use App\Http\Controllers\C_Bantuan;
use App\Http\Controllers\C_Chat;
use App\Http\Controllers\C_Dashboard;
use App\Http\Controllers\C_Ewallet;
use App\Http\Controllers\C_Mitra;
use App\Http\Controllers\C_OrderBahan;
use App\Http\Controllers\C_Product;
use App\Http\Controllers\C_Profil;
use App\Http\Controllers\C_TransaksiMitra;
use App\Http\Middleware\mitraMidleware;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', mitraMidleware::class])->group(function () {
    Route::prefix('mitra')->group(function () {
        Route::post('/status/{status}', [C_Mitra::class, 'updateStatusToko'])->name('mitra.status.update');
        Route::get('dashboard', [C_Dashboard::class, 'mitraDashboard'])->name('mitra.dashboard');

        Route::prefix('profile')->group(function () {
            Route::get('/', [C_Profil::class, 'index'])->name('mitra.profile');
            Route::get('/edit', [C_Profil::class, 'edit'])->name('mitra.profile.edit');
            Route::post('/edit', [C_Profil::class, 'update'])->name('mitra.profile.update');
        });

        Route::get('produk', [C_Product::class, 'index'])->name('mitra.produk');
        Route::patch('produk/{id}', [C_Product::class, 'updateStock'])->name('mitra.produk.update');

        Route::prefix('bahanbaku')->group(function () {
            Route::get('/', [C_OrderBahan::class, 'index'])->name('mitra.order bahan');
            Route::get('create', [C_OrderBahan::class, 'create'])->name('mitra.order bahan.create');
            Route::post('store', [C_OrderBahan::class, 'store'])->name('mitra.order bahan.store');
            Route::patch('{id}', [C_OrderBahan::class, 'update'])->name('mitra.order bahan.update');
            Route::get('{id}/payment', [C_OrderBahan::class, 'payment'])->name('mitra.order bahan.payment');
            Route::get('{id}', [C_OrderBahan::class, 'show'])->name('mitra.order bahan.show');
        });

        Route::get('/bantuan', [C_Bantuan::class, 'index'])->name('mitra.bantuan');

        Route::prefix('/chat')->group(function () {
            Route::get('/', [C_Chat::class, 'indexMitra'])->name('mitra.chat.index');
            Route::post('{id}', [C_Chat::class, 'pushChat'])->name('mitra.chat.store');
            Route::delete('{id}', [C_Chat::class, 'destroy'])->name('mitra.chat.delete');
        });

        Route::prefix('transaksi')->group(function () {
            Route::get('/', [C_TransaksiMitra::class, 'index'])->name('mitra.transaksi');
            Route::get('{id}', [C_TransaksiMitra::class, 'show'])->name('mitra.transaksi.show')->withoutMiddleware(mitraMidleware::class);
            Route::patch('{id}', [C_TransaksiMitra::class, 'update'])->name('mitra.transaksi.update');
        });

        Route::prefix('ewallet')->group(function () {
            Route::get('/', [C_Ewallet::class, 'index'])->name('mitra.ewallet');
            Route::post('/', [C_Ewallet::class, 'store'])->name('mitra.ewallet.store');
        });
    });
});
