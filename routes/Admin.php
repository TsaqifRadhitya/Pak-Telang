<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\ewalletController;
use App\Http\Controllers\kontenController;
use App\Http\Controllers\mitraController;
use App\Http\Controllers\pengajuanMitraController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\profileController;
use App\Http\Controllers\transaksiAdminController;
use App\Http\Middleware\adminMidleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', adminMidleware::class])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', [dashboardController::class, 'adminDashboard'])->name('admin.dashboard');

        Route::prefix('mitra')->group(function () {
            Route::get('/', [mitraController::class, 'index'])->name('admin.mitra');
            Route::get('{id}/pengajuan', [pengajuanMitraController::class, 'detailPengajuan'])->name('admin.mitra.pengajuan.index');
            Route::patch('{id}/{status}', [pengajuanMitraController::class, 'statusUpdate'])->name('admin.mitra.pengajuan.update');
        });

        Route::resource('product', ProductController::class)->except(['create', 'edit', 'index'])->names('admin.product');
        Route::get('produk', [ProductController::class, 'index'])->name('admin.produk');

        Route::prefix('profile')->group(function () {
            Route::get('/', [profileController::class, 'index'])->name('admin.profile');
            Route::get('/edit', [profileController::class, 'edit'])->name('admin.profile.edit');
            Route::post('/edit', [profileController::class, 'update'])->name('admin.profile.update');
        });

        Route::get('konten', [kontenController::class, 'index'])->name('admin.konten');
        Route::resource('konten', kontenController::class)->except('index')->names('admin.konten');

        Route::prefix('transaksi')->group(function () {
            Route::get('/', [transaksiAdminController::class, 'index'])->name('admin.transaksi');
            Route::get('{id}', [transaksiAdminController::class, 'show'])->name('admin.transaksi.show');
            Route::patch('{id}', [transaksiAdminController::class, 'update'])->name('admin.transaksi.update');
        });

        Route::prefix('ewallet')->group(function () {
            Route::get('/', [ewalletController::class, 'index'])->name('admin.ewallet');
            Route::patch('{id}', [ewalletController::class, 'update'])->name('admin.ewallet.store');
        });

        // Route::prefix('/chat')->group(function(){
        //     Route::get('/',[])->name('admin.chat');
        //     Route::get('{id}')->name('admin.chat.show');
        //     Route::post('{id}')->name('admin.chat.store');
        //     Route::delete('{id}')->name('admin.chat.delete');
        // });
    });
});
