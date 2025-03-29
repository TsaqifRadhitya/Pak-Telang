<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\mitraController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\profileController;
use App\Http\Middleware\adminMidleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', adminMidleware::class])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', [dashboardController::class, 'adminDashboard'])->name('admin.dashboard');
        Route::get('mitra', [mitraController::class, 'index'])->name('admin.mitra');
        Route::get('produk', [ProductController::class, 'index'])->name('admin.produk');
        Route::prefix('profile')->group(function () {
            Route::get('/', [profileController::class, 'index'])->name('admin.profile');
            Route::get('/edit', [profileController::class, 'edit'])->name('admin.profile.edit');
        });
        Route::resource('product', ProductController::class)->names('admin.product');
        Route::get('/stock', 'ProductController@showStock')->name('admin.stock.index');
        Route::patch('/stock/{id}', 'ProductController@updateStock')->name('admin.stock.update');
        Route::delete('/stock/{id}', 'ProductController@destroy')->name('admin.stock.destroy');
    });
});
