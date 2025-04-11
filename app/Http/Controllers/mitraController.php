<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class mitraController extends Controller
{
    public function index(){
        return Inertia::render('Pak Telang/Mitra/mitra');
    }

    public function mou(){
        return Inertia::render('Customer/Pengajuan Mitra/mou');
    }
}
