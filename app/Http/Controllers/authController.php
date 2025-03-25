<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class authController extends Controller
{
    public function loginOauth()
    {
        return Inertia::location(Socialite::driver('google')->redirect()->getTargetUrl());
    }

    public function callbackOauth(Request $request)
    {
        $userData = Socialite::driver('google')->stateless()->user();

        $user = User::whereEmail($userData->email)->first();
        if (!$user) {
            return redirect(route('login'))->withErrors('Akun tidak tersedia', 'email');
        }
        Auth::login($user);

        return to_route('dashboard');
    }
}
