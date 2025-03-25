<?php

use App\Http\Controllers\ProductController;
use App\Http\Middleware\adminMidleware;
use Illuminate\Support\Facades\Route;

Route::middleware(adminMidleware::class)->group(function(){
    Route::prefix('admin')->group(function(){
        Route::resource('product',ProductController::class)->names('admin.product');
    });
});
