<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Middleware\customerMidleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', customerMidleware::class])->group(function () {
    Route::prefix('profile')->group(function () {
        Route::get('/', [profileController::class, 'index'])->name('customer.profile');
        Route::get('/edit', [profileController::class, 'edit'])->name('customer.profile.edit');
        Route::post('/edit', [profileController::class, 'update'])->name('customer.profile.update');
    });

    // Route::get('pengajuanmitra')->name();
});
