<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\profileController;
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
        // Route::get('/stock', [ProductController::class, 'showStock'])->name('mitra.stock.index');
        // Route::patch('/stock/{id}', [ProductController::class, 'updateStock'])->name('mitra.stock.update');
        // Route::delete('/stock/{id}', [ProductController::class, 'destroy'])->name('mitra.stock.destroy');
        // Route::get('dashboard', [dashboardController::class, 'mitraDashboard'])->name('mitra.dashboard');
    });
});
