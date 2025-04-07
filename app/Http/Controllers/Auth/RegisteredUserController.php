<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/RegiterPage');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|',
            'password' => ['required'],
        ]);

        if (User::where('email', '=', $request->input('email'))->count() > 0) {
            if ($request->input('password') != $request->input('password_confirmation')){
                throw ValidationException::withMessages([
                    'email' => 'Email telah terdaftar',
                    'password' => 'Password tidak sama'
                ]);
            } else {
                throw ValidationException::withMessages([
                    'email' => 'Email telah terdaftar',
                ]);
            }
            return back();
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'Customer'
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect('/')->with('success','Register Berhasil!');
    }
}
