<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\City;
use App\Models\District;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class profileController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        if ($role === 'Customer') {
        }
        $addres = Address::with('district')->where('default', '=', true)->where('userId', '=', Auth::user()->id)->first();
        $address = $addres ? $this->getFullAdress($addres?->id) : null;
        if ($role === 'Pak Telang') {
            return Inertia::render('Pak Telang/Profile/profile', compact('address'));
        } else {
            return Inertia::render('Mitra/Profile/profile', compact('address'));
        }
    }

    public function edit()
    {
        $role = Auth::user()->role;
        if ($role === 'Customer') {
        }
        $addres = Address::with('district')->where('default', '=', true)->where('userId', '=', Auth::user()->id)->first();
        $address = $addres ? $this->getFullAdress($addres?->id) : null;
        if ($role === 'Pak Telang') {
            return Inertia::render('Pak Telang/Profile/editProfile', compact('address'));
        } else {
            return Inertia::render('Mitra/Profile/editProfile', compact('address'));
        }
    }

    public function update(Request $request)
    {
        $request->validate(['phonenumber' => ['required', 'unique:' . User::class . ',phonenumber,' . auth()->id()]]);
        $role = Auth::user()->role;
        if ($role === 'Customer') {
            return;
        }
        return $this->updateprofilenonCustomer($request);
    }

    private function getFullAdress($id)
    {
        $addres = Address::whereId($id)->first();
        $district = $addres->district()->first();
        $city = $district->city()->first();
        $province = $city->province()->first();
        return [
            'address' => $addres->address,
            'postalCode' => $addres->postalCode,
            'districtName' => $district->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }

    private function updateprofilenonCustomer(Request $request)
    {
        User::whereId(Auth::user()->id)->update(
            [
                'name' => $request->input('name'),
                'birthday' => $request->input('birthday'),
                'gender' => $request->input('gender'),
                'phonenumber' => $request->input('phonenumber'),
                'profile_picture' => $request->input('profile_picture'),
            ]
        );
        $this->updateAdress($request);
        if (Auth::user()->role === 'Mitra') {
            return redirect(route('mitra.profile'));
        }
        return redirect(route('admin.profile'));
    }

    private function updateAdress(Request $request)
    {
        $province = Province::firstOrNew(['province' =>  $request->input('province')]);
        $province->save(); // Pastikan tersimpan

        $city = City::firstOrNew(['cityName' =>  $request->input('cityName'), 'provinceId' => $province->id]);
        $city->save(); // Pastikan tersimpan

        $district = District::firstOrNew(['districtName' =>  $request->input('districtName'), 'cityId' => $city->id]);
        $district->save(); // Pastikan tersimpan

        if (Auth::user()->role !== 'Customer') {
            $address = Address::updateOrCreate(['userId' => Auth::user()->id], [
                'address' => $request->input('address'),
                'postalCode' => $request->input('postalCode'),
                'districtId' => $district->id
            ]);
        }
    }
}
