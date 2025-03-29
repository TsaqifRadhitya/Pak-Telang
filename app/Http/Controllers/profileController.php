<?php

namespace App\Http\Controllers;

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
}
