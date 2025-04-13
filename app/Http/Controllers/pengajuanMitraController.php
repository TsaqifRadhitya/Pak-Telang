<?php

namespace App\Http\Controllers;

use App\Models\pengajuanMitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class pengajuanMitraController extends Controller
{
    public function index(Request $request)
    {
        $type = pengajuanMitra::where('userId', '=', $request->user()->id)->count() > 1 ? "Sudah Ada" : 'Baru';
        return Inertia::render('Customer/Pengajuan Mitra/index', compact('type'));
    }

    public function create(Request $request)
    {
        $address = $this->getFullAdress();
        return Inertia::render('Customer/Pengajuan Mitra/create', compact('address'));
    }

    private function getFullAdress()
    {
        if (!Auth::user()->address || !Auth::user()->districtId || !Auth::user()->postalCode) {
            return null;
        };
        $district = Auth::user()->district()->first();
        $city = $district->city()->first();
        $province = $city->province()->first();
        return [
            'address' => Auth::user()->address,
            'postalCode' =>  Auth::user()->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }

    public function statusCheck(Request $request) {}

    public function statusUpdate(Request $request) {}

    public function store(Request $request) {}
}
