<?php

use App\Http\Controllers\pengajuanMitraController;
use App\Http\Controllers\profileController;
use App\Http\Middleware\customerMidleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', customerMidleware::class])->group(function () {
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'index'])->name('customer.profile');
        Route::get('/edit', [profileController::class, 'edit'])->name('customer.profile.edit');
        Route::post('/edit', [profileController::class, 'update'])->name('customer.profile.update');
    });

    Route::prefix('pengajuanmitra')->group(function () {
        Route::get('/', [pengajuanMitraController::class, 'index'])->name('customer.pengajuanmitra.index');
        Route::get('/create', [pengajuanMitraController::class, 'create'])->name('customer.pengajuanmitra.create');
        Route::post('/store', [pengajuanMitraController::class, 'store'])->name('customer.pengajuanmitra.store');
        Route::get('/status', [pengajuanMitraController::class, 'statusCheck'])->name('customer.pengajuanmitra.status');
    });
});
