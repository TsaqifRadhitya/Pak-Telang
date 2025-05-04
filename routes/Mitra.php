<?php

use App\Http\Controllers\bahanBakuController;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\ewalletController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\profileController;
use App\Http\Controllers\transaksiMitraController;
use App\Http\Middleware\mitraMidleware;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', mitraMidleware::class])->group(function () {
    Route::prefix('mitra')->group(function () {
        Route::get('dashboard', [dashboardController::class, 'mitraDashboard'])->name('mitra.dashboard');

        Route::prefix('profile')->group(function () {
            Route::get('/', [profileController::class, 'index'])->name('mitra.profile');
            Route::get('/edit', [profileController::class, 'edit'])->name('mitra.profile.edit');
            Route::post('/edit', [profileController::class, 'update'])->name('mitra.profile.update');
        });

        Route::get('produk', [ProductController::class, 'index'])->name('mitra.produk');
        Route::patch('produk/{id}', [ProductController::class, 'updateStock'])->name('mitra.produk.update');

        Route::prefix('bahanbaku')->group(function () {
            Route::get('/', [bahanBakuController::class, 'index'])->name('mitra.order bahan');
            Route::get('create', [bahanBakuController::class, 'create'])->name('mitra.order bahan.create');
            Route::post('store', [bahanBakuController::class, 'store'])->name('mitra.order bahan.store');
            Route::patch('{id}', [bahanBakuController::class, 'update'])->name('mitra.order bahan.update');
            Route::get('{id}/payment', [bahanBakuController::class, 'payment'])->name('mitra.order bahan.payment');
            Route::get('{id}', [bahanBakuController::class, 'show'])->name('mitra.order bahan.show');
        });

        Route::prefix('transaksi')->group(function () {
            Route::get('/', [transaksiMitraController::class, 'index'])->name('mitra.transaksi');
            Route::get('{id}', [transaksiMitraController::class, 'show'])->name('mitra.transaksi.show');
            Route::patch('{id}', [transaksiMitraController::class, 'update'])->name('mitra.transaksi.update');
        });

        Route::prefix('ewallet')->group(function () {
            Route::get('/', [ewalletController::class, 'index'])->name('mitra.ewallet');
            Route::post('/', [ewalletController::class, 'store'])->name('mitra.ewallet.store');
        });
    });
});
