<?php

namespace App\Http\Controllers;

use App\Models\mitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class mitraController extends Controller
{
    public function index()
    {
        $mitra = mitra::with('user')->where('statusPengajuan', '=', 'MOU disetujui')->get()->map(function ($data) {
            $address = $this->getMitraAddress($data);
            return [...$data->toArray(), 'address' => $address, 'fotoDapur' => json_decode($data->fotoDapur)];
        });
        $pengajuanMitra = mitra::with('user')->where('statusPengajuan', '!=', 'MOU disetujui')->get()->map(function ($data) {
            $address = $this->getMitraAddress($data);
            return [...$data->toArray(), 'address' => $address, 'fotoDapur' => json_decode($data->fotoDapur)];
        });
        return Inertia::render('Pak Telang/Mitra/mitra', compact('mitra', 'pengajuanMitra'));
    }

    private function getMitraAddress(mitra $mitra)
    {
        $district = $mitra->district()->first();
        $city = $district->city()->first();
        $province = $city->province()->first();
        return [
            'address' => $mitra->address,
            'postalCode' =>  $mitra->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }

    public function mou()
    {
        return Inertia::render('Customer/Pengajuan Mitra/mou');
    }
}
