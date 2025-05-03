<?php

use App\Http\Controllers\midtransController;
use App\Http\Controllers\pengajuanMitraController;
use App\Http\Controllers\profileController;
use App\Http\Controllers\transaksiCustomerController;
use App\Http\Middleware\customerMidleware;
use Illuminate\Support\Facades\Route;

Route::post('/midtrans/callback', [midtransController::class, 'callback'])->name('midtrans.callback');

Route::prefix('transaksi')->group(function () {
    Route::get('/', [transaksiCustomerController::class, 'index'])->name('transaksi');
    Route::get('create', [transaksiCustomerController::class, 'create'])->name('transaksi.create');
    Route::get('{id}', [transaksiCustomerController::class, 'show'])->name('transaksi.show');
    Route::post('store', [transaksiCustomerController::class, 'store'])->name('transaksi.store');
    Route::patch('{id}', [transaksiCustomerController::class, 'update'])->name('transaksi.update');
})->middleware('auth');

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
        Route::get('/mou', [pengajuanMitraController::class, 'mou'])->name('customer.mou.index');
    });


});
