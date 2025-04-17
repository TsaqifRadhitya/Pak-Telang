<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\mitraController;
use App\Http\Controllers\pengajuanMitraController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\profileController;
use App\Http\Middleware\adminMidleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', adminMidleware::class])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', [dashboardController::class, 'adminDashboard'])->name('admin.dashboard');
        Route::prefix('mitra')->group(function () {
            Route::get('/', [mitraController::class, 'index'])->name('admin.mitra');
        Route::get('{id}/pengajuan', [pengajuanMitraController::class,'detailPengajuan'])->name('admin.mitra.pengajuan.index');
            Route::patch('{id}/{status}', [pengajuanMitraController::class,'statusUpdate'])->name('admin.mitra.pengajuan.update');
        });
        Route::get('produk', [ProductController::class, 'index'])->name('admin.produk');
        Route::prefix('profile')->group(function () {
            Route::get('/', [profileController::class, 'index'])->name('admin.profile');
            Route::get('/edit', [profileController::class, 'edit'])->name('admin.profile.edit');
            Route::post('/edit', [profileController::class, 'update'])->name('admin.profile.update');
        });
        Route::resource('product', ProductController::class)->except(['create', 'edit', 'index'])->names('admin.product');
        // Route::get('/stock', [ProductController::class,'showStock'])->name('admin.stock.index');
        // Route::patch('/stock/{id}', [ProductController::class,'updateStock'])->name('admin.stock.update');
        // Route::delete('/stock/{id}', [ProductController::class,'destroy'])->name('admin.stock.destroy');
    });
});
