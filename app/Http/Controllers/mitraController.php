<?php

namespace App\Http\Controllers;

use App\Models\mitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use phpDocumentor\Reflection\Types\Boolean;

class mitraController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->category;
        $search = $request->search;

        $query = mitra::with('user');

        if ($category === 'pengajuan') {
            $query->where('statusPengajuan', '!=', 'MOU disetujui');
        } elseif ($category === 'aktif') {
            $query->where('statusPengajuan', 'MOU disetujui')->where('isOpen', true);
        } elseif ($category === 'nonaktif') {
            $query->where('statusPengajuan', 'MOU disetujui')->where('isOpen', false);
        }

        if ($search) {
            $query->whereRelation('user', 'name', 'ilike', "%{$search}%");
        }

        $mitra = $query->get()->map(function ($data) {
            $address = $this->getMitraAddress($data);
            return [
                ...$data->toArray(),
                'address' => $address,
                'fotoDapur' => json_decode($data->fotoDapur),
            ];
        });

        return Inertia::render('Pak Telang/Mitra/mitra', compact('mitra', 'search', 'category'));
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

    public function updateStatusToko($status)
    {
        Auth::user()->mitra->update(
            ['isOpen' => $status === "true" ? true : false]
        );

        return back()->with('success','Status toko berhasil diperbarui');
    }
}
