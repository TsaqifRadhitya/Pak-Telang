<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class authController extends Controller
{
    public function loginOauth($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callbackOauth($provider)
    {
        $userData = Socialite::driver($provider)->user();
        dd($userData);

        $user = User::whereEmail($userData->email);
        if (!$user) {
            return redirect(route('login'))->withErrors('Akun tidak tersedia', 'email');
        }
        Auth::login($user);

        return to_route('dashboard');
    }
}
