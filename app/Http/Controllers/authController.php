<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
        if ($user === null) {
            $user = User::create([
                'email' => $userData->email,
                'name' => $userData->name,
                'password' => Hash::make(Hash::make(str()->random())),
                'profile_picture' => $userData->avatar,
                'role' => 'Customer',
            ]);
        }
        Auth::login($user, true);

        if (Auth::user()->role === 'Customer') {
            return redirect()->intended('/');
        }

        return redirect()->intended(route('dashboard'));
    }
}
