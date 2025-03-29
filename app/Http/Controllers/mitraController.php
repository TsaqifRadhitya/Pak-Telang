<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class mitraController extends Controller
{
    public function index(){
        return Inertia::render('Pak Telang/Mitra/mitra');
    }
}
