<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class rajaOngkirController extends Controller
{
    public function index(Request $request)
    {
        $from = $this->getAddressId(User::where('role', 'Pak Telang')->first());
        $destination = $this->getAddressId(Auth::user());
        $kurirOption = $this->getKurirOption($from, $destination, $request);
        return $kurirOption;
    }

    public function getAddressId(User $user)
    {
        $address = $user->address;
        $postalCode = $user->postalCode;
        $district = $user->district()->first();
        $city = $district->city()->first();
        $province = $city->province()->first();

        $fullAddresss = $address . ', ' . $district->districtName . ", " . $city->cityName . ", " . $province->province . ", " . $postalCode;

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'key' => env('VITE_RAJAONGKIR_API_KEY_ID'), // sesuaikan jika key-nya beda
        ])->get('https://rajaongkir.komerce.id/api/v1/destination/domestic-destination', [
            'search' => $fullAddresss,
        ]);
        return $response->json('data.0.id');
    }

    public function getKurirOption($from, $to, Request $request)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'x-api-key' => env('VITE_RAJAONGKIR_API_KEY'), // atau nama env yang sesuai
        ])->get('https://api-sandbox.collaborator.komerce.id/tariff/api/v1/calculate', [
            'shipper_destination_id' => $from,
            'receiver_destination_id' => $to,
            'weight' => $request->weight,
            'item_value' => $request->item_value,
        ]);

        return $response->json('data.calculate_reguler');
    }
}
