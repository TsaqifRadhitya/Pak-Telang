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
            dd($userData);
            $user = User::create([
                'email' => $userData->email,
                'name' => $userData->name,
                'password' => Hash::make(fake()->sentence()),
                'profile_picture' => json_encode([$userData->avatar]),
                'role' => 'Customer',
            ]);
            // return redirect(route('login'))->withErrors('Akun tidak tersedia', 'email');
        }
        Auth::login($user, true);

        return to_route('dashboard');
    }
}
