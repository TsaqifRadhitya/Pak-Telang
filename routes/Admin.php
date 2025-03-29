<?php

use App\Http\Controllers\ProductController;
use App\Http\Middleware\adminMidleware;
use Illuminate\Support\Facades\Route;

Route::middleware(adminMidleware::class)->group(function(){
    Route::prefix('admin')->group(function(){
        Route::get('dashboard')->name('admin.dashboard');
        Route::resource('product',ProductController::class)->names('admin.product');
        Route::get('/stock','ProductController@showStock')->name('admin.stock.index');
        Route::patch('/stock/{id}','ProductController@updateStock')->name('admin.stock.update');
        Route::delete('/stock/{id}','ProductController@destroy')->name('admin.stock.destroy');
    });
});
