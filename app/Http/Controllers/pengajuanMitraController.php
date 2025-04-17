<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\District;
use App\Models\mitra;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class pengajuanMitraController extends Controller
{
    public function index(Request $request)
    {
        $type = mitra::where('userId', '=', $request->user()->id)->count() > 0 ? "Sudah Ada" : 'Baru';
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

    public function mou()
    {
        $mitra = mitra::with('user')->where('userId', '=', Auth::user()->id)->where('statusPengajuan', '=', 'Formulir disetujui')->first();
        if (!$mitra) abort(404);
        $mitra = [...$mitra->toArray(), 'address' => $this->getMitraAddress($mitra), 'fotoDapur' => json_decode($mitra->fotoDapur)];
        return Inertia::render('Customer/Pengajuan Mitra/statusMouPending', compact('mitra'));
    }

    public function statusCheck(Request $request)
    {
        $status = $request->user()->mitra->statusPengajuan;
        switch ($status) {
            case "Menunggu Persetujuan Formulir":
                return Inertia::render('Customer/Pengajuan Mitra/statusFormPending');
            case 'Formulir disetujui':
                return Inertia::render('Customer/Pengajuan Mitra/statusFormApprove');
            case 'Formulir ditolak':
                return Inertia::render('Customer/Pengajuan Mitra/statusFormRejected');
            case 'Menunggu MOU':
            case 'MOU ditolak':
                return Inertia::render('Customer/Pengajuan Mitra/statusMouRejected');
        }
    }

    public function statusUpdate(Request $request, $id, $status)
    {
        $mitraStatus = mitra::whereId($id)->first()?->statusPengajuan;
        if ($mitraStatus === "Menunggu Persetujuan Formulir") {
            if ($status === "accept") {
                $updateStatus = "Formulir disetujui";
            } else if ($status === "decline") {
                $updateStatus = "Formulir ditolak";
            }
        } else if ($mitraStatus === 'Menunggu MOU') {
            if ($status === "accept") {
                $updateStatus = "MOU ditolak";
            } else if ($status === "decline") {
                $updateStatus = "MOU ditolak";
            }
        }

        if (isset($updateStatus)) {
            mitra::whereId($id)->update(
                ['statusPengajuan' => $updateStatus, 'pesanPersetujuan' => $request->input('pesanPersetujuan')]
            );
            return back()->with('success', 'Berhasil Mengubah Status Pengajuan Mitra');
        }
        abort(404);
    }

    public function detailPengajuan($id)
    {

        $mitra = mitra::with('user')->whereId($id)->first();


        if ($mitra) {
            $mitra = [...$mitra->toArray(), 'address' => $this->getMitraAddress($mitra), 'fotoDapur' => json_decode($mitra->fotoDapur)];
            return Inertia::render('Pak Telang/Mitra/detailSubmission', compact('mitra'));
        }
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

    public function store(Request $request)
    {
        if ($request->user()->mitra?->statusPengajuan === 'Menunggu MOU') {
            return $this->storeMoU($request);
        }

        $request->validate([
            'namaUsaha' => ['required', 'unique:mitras,namaUsaha', 'phonenumber' => ['required', 'unique:' . User::class . ',phonenumber,' . auth()->id()]],
        ], [
            'namaUsaha.unique' => 'Nama Usaha Sudah Terdaftar',
            'phonenumber.unique' => "Nomor Hp Sudah Terdaftar"
        ]);

        User::whereId($request->user()->id)->update(
            [
                'phonenumber' => $request->input('phonenumber'),
                'name' => $request->input('name'),
                'birthday' => $request->input('birthday'),
                'gender' => $request->input('gender')
            ],
        );

        $resBody = $request->all();
        $resBody['fotoDapur'] = json_encode($resBody['fotoDapur']);
        $province = Province::firstOrNew(['province' =>  $request->input('province')]);
        $province->save(); // Pastikan tersimpan

        $city = City::firstOrNew(['cityName' =>  $request->input('cityName'), 'provinceId' => $province->id]);
        $city->save(); // Pastikan tersimpan

        $district = District::firstOrNew(['districtName' =>  $request->input('districtName'), 'cityId' => $city->id]);
        $district->save(); // Pastikan tersimpan
        mitra::create([...$resBody, "userId" => Auth::user()->id, "districtId" => $district->id, "statusPengajuan" => "Menunggu Persetujuan Formulir"]);
        return redirect(route('customer.pengajuanmitra.status'))->with('success', 'Berhasil Mengirim Form Pengajuan Mitra');
    }

    public function storeMoU(Request $request)
    {
        mitra::where('userId', '=', $request->user()->id)->update(
            ['statusPengajuan' => 'Menunggu Persetujuan MOU', 'mou' => $request->input('mou')]
        );
        return back()->with('success', 'Berhasil Mengupload Pengesahan MoU');
    }
}
