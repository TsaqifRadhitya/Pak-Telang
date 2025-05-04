<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class transaksiMitraController extends Controller
{
    public function index() {
        return Inertia::render('Mitra/Transaksi/index');
    }

    public function create(Request $request) {
    }

    public function show($id) {}

    public function store(Request $request) {}

    public function update($id) {}
}
