<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class profileController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        if ($role === 'Customer') {
        } else if ($role === 'Pak Telang') {
            return Inertia::render('Pak Telang/Profile/profile');
        } else {
        }
    }

    public function edit()
    {
        $role = Auth::user()->role;
        if ($role === 'Customer') {
        } else if ($role === 'Pak Telang') {
            return Inertia::render('Pak Telang/Profile/editProfile');
        } else {
        }
    }

    public function update(Request $request)
    {
        $request->validate(['phonenumber' => ['required', 'unique:' . User::class . ',phonenumber,' . auth()->id()]]);
        $role = Auth::user()->role;
        if ($role === 'Customer') {
        } else if ($role === 'Pak Telang') {
            return $this->updateprofileAdmin($request);
        } else {
        }
    }

    private function updateprofileAdmin(Request $request)
    {

        User::whereId(Auth::user()->id)->update(
            [
                'name' => $request->input('name'),
                'birthday' => $request->input('birthday'),
                'gender' => $request->input('gender'),
                'phonenumber' => $request->input('phonenumber'),
                'profile_picture' => $request->input('profile_picture'),
            ]
        );
        return redirect(route('admin.profile'));
    }
}
