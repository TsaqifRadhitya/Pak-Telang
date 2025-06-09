<?php

use App\Http\Controllers\C_PengajuanMitra;
use App\Http\Controllers\C_Profil;
use App\Http\Controllers\C_TransaksiCustomer;
use App\Http\Controllers\profileController;
use App\Http\Controllers\transaksiCustomerController;
use App\Http\Middleware\customerMidleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', customerMidleware::class])->group(function () {
    Route::prefix('profile')->group(function () {
        Route::get('/', [C_Profil::class, 'index'])->name('customer.profile');
        Route::get('/edit', [C_Profil::class, 'edit'])->name('customer.profile.edit');
        Route::post('/edit', [C_Profil::class, 'update'])->name('customer.profile.update');
    });

    Route::prefix('pengajuanmitra')->group(function () {
        Route::get('/', [C_PengajuanMitra::class, 'index'])->name('customer.pengajuanmitra.index');
        Route::get('/create', [C_PengajuanMitra::class, 'create'])->name('customer.pengajuanmitra.create');
        Route::post('/store', [C_PengajuanMitra::class, 'store'])->name('customer.pengajuanmitra.store');
        Route::get('/status', [C_PengajuanMitra::class, 'statusCheck'])->name('customer.pengajuanmitra.status');
        Route::get('/mou', [C_PengajuanMitra::class, 'mou'])->name('customer.mou.index');
    });

    Route::prefix('transaksi')->group(function () {
        Route::get('/', [C_TransaksiCustomer::class, 'index'])->name('customer.transaksi.index');
        Route::get('create', [C_TransaksiCustomer::class, 'create'])->withoutMiddleware(customerMidleware::class)->name('customer.transaksi.create');
        Route::get('{id}', [C_TransaksiCustomer::class, 'show'])->name('customer.transaksi.show');
        Route::post('store', [C_TransaksiCustomer::class, 'store'])->name('customer.transaksi.store');
        Route::patch('{id}', [C_TransaksiCustomer::class, 'update'])->name('customer.transaksi.update');
        // Route::get('{id}/payment',[transaksiCustomerController::class,'payment'])->name('customer.transaksi.payment');
    });
});
