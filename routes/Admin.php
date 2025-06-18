<?php

use App\Http\Controllers\C_Chat;
use App\Http\Controllers\C_Dashboard;
use App\Http\Controllers\C_Donasi;
use App\Http\Controllers\C_Ewallet;
use App\Http\Controllers\C_Konten;
use App\Http\Controllers\C_Mitra;
use App\Http\Controllers\C_PengajuanMitra;
use App\Http\Controllers\C_Product;
use App\Http\Controllers\C_Profil;
use App\Http\Controllers\C_TransaksiAdmin;
use App\Http\Controllers\transaksiAdminController;
use App\Http\Middleware\adminMidleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', adminMidleware::class])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('callback', fn() => Inertia::render('Pak Telang/CallbackManual/index'))->name('admin.callback.manual');
        Route::get('dashboard', [C_Dashboard::class, 'adminDashboard'])->name('admin.dashboard');

        Route::prefix('mitra')->group(function () {
            Route::get('/', [C_Mitra::class, 'index'])->name('admin.mitra');
            Route::get('{id}/pengajuan', [C_PengajuanMitra::class, 'detailPengajuan'])->name('admin.mitra.pengajuan.index');
            Route::patch('{id}/{status}', [C_PengajuanMitra::class, 'statusUpdate'])->name('admin.mitra.pengajuan.update');
        });

        Route::resource('product', C_Product::class)->except(['create', 'edit', 'index'])->names('admin.product');
        Route::get('produk', [C_Product::class, 'index'])->name('admin.produk');

        Route::prefix('profile')->group(function () {
            Route::get('/', [C_Profil::class, 'index'])->name('admin.profile');
            Route::get('/edit', [C_Profil::class, 'edit'])->name('admin.profile.edit');
            Route::post('/edit', [C_Profil::class, 'update'])->name('admin.profile.update');
        });

        Route::get('konten', [C_Konten::class, 'index'])->name('admin.konten');
        Route::resource('konten', C_Konten::class)->except('index')->names('admin.konten');

        Route::prefix('transaksi')->group(function () {
            Route::get('/', [C_TransaksiAdmin::class, 'index'])->name('admin.transaksi');
            Route::get('{id}', [C_TransaksiAdmin::class, 'show'])->name('admin.transaksi.show');
            Route::patch('{id}', [C_TransaksiAdmin::class, 'update'])->name('admin.transaksi.update');
        });

        Route::prefix('ewallet')->group(function () {
            Route::get('/', [C_Ewallet::class, 'index'])->name('admin.ewallet');
            Route::patch('{id}', [C_Ewallet::class, 'update'])->name('admin.ewallet.store');
        });

        Route::prefix('donasi')->group(function () {
            Route::get('/', [C_Donasi::class, 'index'])->name('admin.donasi');
            Route::post('/', [C_Donasi::class, 'penyaluran'])->name('admin.donasi.store');
        });

        Route::prefix('/chat')->group(function () {
            Route::get('/', [C_Chat::class, 'index'])->name('admin.chat');
            Route::get('/swr', [C_Chat::class, 'swr'])->name('admin.chat.swr');
            Route::get('{id}', [C_Chat::class, 'getChatRoom'])->name('admin.chat.show');
            Route::post('{id}', [C_Chat::class, 'pushChat'])->name('admin.chat.store');
            Route::delete('{id}', [C_Chat::class, 'destroy'])->name('admin.chat.delete');
        });

        Route::post('/broadcast', [C_Chat::class, 'broadcast'])->name('broadcast.store');
    });
});
