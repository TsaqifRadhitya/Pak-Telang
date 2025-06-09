<?php

use App\Http\Controllers\Auth\C_Login;
use App\Http\Controllers\Auth\C_RegisterManual;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\C_GoogleAuth;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {

    Route::get('oauth/login', [C_GoogleAuth::class, 'loginOauth'])->name('oauth.login');

    Route::get('oauth/callback', [C_GoogleAuth::class, 'callbackOauth'])->name('oauth.callback');

    Route::get('register', [C_RegisterManual::class, 'create'])
        ->name('register');

    Route::post('register', [C_RegisterManual::class, 'store']);

    Route::get('login', [C_Login::class, 'create'])
        ->name('login');

    Route::post('login', [C_Login::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [C_Login::class, 'destroy'])
        ->name('logout');
});
