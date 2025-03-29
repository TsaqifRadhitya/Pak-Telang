<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class dashboardController extends Controller
{
    public function index(){
        $role = Auth::user()->role;
        if($role === 'Customer'){
            return Inertia::render('dashboard');
        }else if($role === 'Mitra'){

        }else{
            return redirect(route('admin.dashboard'));
        }
    }
}
