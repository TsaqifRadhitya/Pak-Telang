<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class donasiController extends Controller
{
    public function index()
    {
        return Inertia::render('Guest/Donasi/Donasi');
    }

    public function store(Request $request) {
        dd($request->all());
    }
}
