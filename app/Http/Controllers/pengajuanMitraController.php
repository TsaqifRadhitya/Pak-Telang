<?php

namespace App\Http\Controllers;

use App\Models\pengajuanMitra;
use Illuminate\Http\Request;
use Inertia\Inertia;

class pengajuanMitraController extends Controller
{
    public function index(Request $request)
    {
        $type = pengajuanMitra::where('userId', '=', $request->user()->id)->count() > 1 ? "Sudah Ada" : 'Baru';
        return Inertia::render('Customer/Pengajuan Mitra/index',compact('type'));
    }

    public function create() {}

    public function store(Request $request) {}
}
