<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class dashboardController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        if ($role === 'Customer') {
            return Inertia::render('Customer/Dashboard/dashboard');
            // return redirect(route('customer.profile'));
        } else if ($role === 'Mitra') {
            return redirect(route('mitra.dashboard'));
        } else {
            return redirect(route('admin.dashboard'));
        }
    }

    public function adminDashboard()
    {
        return Inertia::render('Pak Telang/Dashboard/dashboard');
    }

    public function mitraDashboard()
    {
        $statusToko = Auth::user()->mitra->isOpen;
        return Inertia::render('Mitra/Dashboard/dashboard', compact('statusToko'));
    }
}
