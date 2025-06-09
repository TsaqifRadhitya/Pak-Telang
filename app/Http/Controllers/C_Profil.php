<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\City;
use App\Models\District;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Symfony\Component\Uid\Ulid;
use Illuminate\Support\Str;

class C_Profil extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        $address = $this->getFullAdress();
        if ($role === 'Customer') {
            return Inertia::render('Customer/Profile/V_HalProfil', compact('address'));
        }
        if ($role === 'Pak Telang') {
            return Inertia::render('Pak Telang/Profile/V_HalProfil', compact('address'));
        } else {
            return Inertia::render('Mitra/Profile/V_HalProfil', compact('address'));
        }
    }

    public function edit(Request $request)
    {
        $fts = $request->fts;
        $role = Auth::user()->role;
        $address = $this->getFullAdress();
        if ($role === 'Pak Telang') {
            return Inertia::render('Pak Telang/Profile/V_HalFormUbahProfil', compact('address'));
        } else if ($role === 'Customer') {
            return Inertia::render('Customer/Profile/V_HalFormUbahProfil', compact('address', 'fts'));
        } else {
            return Inertia::render('Mitra/Profile/V_HalFormUbahProfil', compact('address', 'fts'));
        }
    }

    public function update(Request $request)
    {
        $request->validate(['phonenumber' => ['required', 'unique:' . User::class . ',phonenumber,' . auth()->id()]], ['phonenumber.unique' => "Nomor Hp Sudah Terdaftar"]);
        $role = Auth::user()->role;
        $profilePicture = Str::contains($request->input('profile_picture'), '?q=') ? $request->input('profile_picture') : $request->input('profile_picture') . '?q=' . Ulid::generate(now());
        $user = User::find(Auth::user()->id);
        $user->update(
            [
                'name' => $request->input('name'),
                'birthday' => $request->input('birthday'),
                'gender' => $request->input('gender'),
                'phonenumber' => $request->input('phonenumber'),
                'profile_picture' => $profilePicture,
            ]
        );
        $this->updateAdress($request);
        if ($role === 'Mitra') {
            if ($request->fts) {
                return redirect()->route('mitra.order bahan.create')->with('success', 'Berhasil mengubah alamat');
            }
            return redirect(route('mitra.profile'))->with('success', 'Profile Berhasil Diperbarui !');
        }
        if ($role === 'Customer') {
            if ($request->fts) {
                if ($request->input('cityName') !== $user?->district?->city?->cityName) {
                    Session::put('reset', true);
                }
                return redirect()->route('customer.transaksi.create')->with('success', 'Berhasil mengubah alamat');
            }
            return redirect(route('customer.profile'))->with('success', 'Profile Berhasil Diperbarui !');
        }
        return redirect(route('admin.profile'))->with('success', 'Profile Berhasil Diperbarui !');
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

    private function updateAdress(Request $request)
    {
        $province = Province::firstOrNew(['province' =>  $request->input('province')]);
        $province->save(); // Pastikan tersimpan

        $city = City::firstOrNew(['cityName' =>  $request->input('cityName'), 'provinceId' => $province->id]);
        $city->save(); // Pastikan tersimpan

        $district = District::firstOrNew(['districtName' =>  $request->input('districtName'), 'cityId' => $city->id]);
        $district->save(); // Pastikan tersimpan

        User::whereId(Auth::user()->id)->update(
            [
                'address' => $request->input('address'),
                'postalCode' => $request->input('postalCode'),
                'districtId' => $district->id
            ]
        );
    }
}
