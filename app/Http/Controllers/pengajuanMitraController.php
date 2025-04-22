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
use Illuminate\Validation\ValidationException;

class pengajuanMitraController extends Controller
{
    public function index(Request $request)
    {
        $type = mitra::where('userId', '=', $request->user()->id)->count() > 0 ? "Sudah Ada" : 'Baru';
        return Inertia::render('Customer/Pengajuan Mitra/index', compact('type'));
    }

    public function create(Request $request)
    {

        $mitra = mitra::where('userId', '=', Auth::user()->id)->first();

        if ($mitra === null || $mitra->statusPengajuan === 'Formulir ditolak') {
            $address = $this->getFullAdress();
            return Inertia::render('Customer/Pengajuan Mitra/create', compact('address'));
        }

        return redirect(route('customer.pengajuanmitra.status'));
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
        $mitra = mitra::with('user')->where('userId', '=', Auth::user()->id)->where('statusPengajuan', '=', 'Formulir disetujui')->orWhere('statusPengajuan', '=', 'MOU ditolak')->first();
        if (!$mitra) return redirect(route('customer.pengajuanmitra.status'));
        $mitra = [...$mitra->toArray(), 'address' => $this->getMitraAddress($mitra), 'fotoDapur' => json_decode($mitra->fotoDapur)];
        return Inertia::render('Customer/Pengajuan Mitra/statusMouPending', compact('mitra'));
    }

    public function statusCheck(Request $request)
    {
        $mitra = $request->user()->mitra;
        if ($mitra === null) return redirect(route('customer.pengajuanmitra.create'));
        $mitra = [...$mitra->toArray(), 'address' => $this->getMitraAddress($mitra), 'fotoDapur' => json_decode($mitra->fotoDapur)];
        switch ($mitra['statusPengajuan']) {
            case "Menunggu Persetujuan Formulir":
                return Inertia::render('Customer/Pengajuan Mitra/statusFormPending', compact('mitra'));
            case 'Formulir disetujui':
                return Inertia::render('Customer/Pengajuan Mitra/statusFormApprove', compact('mitra'));
            case 'Formulir ditolak':
                return Inertia::render('Customer/Pengajuan Mitra/statusFormRejected', compact('mitra'));
            case 'Menunggu Persetujuan MOU':
                return Inertia::render('Customer/Pengajuan Mitra/statusMoUWaitingApprovement', compact('mitra'));
            case 'MOU ditolak':
                return Inertia::render('Customer/Pengajuan Mitra/statusMouRejected', compact('mitra'));
        }
    }

    public function statusUpdate(Request $request, $id, $status)
    {
        $mitra = mitra::whereId($id)->first();
        $mitraStatus = $mitra?->statusPengajuan;
        if ($mitraStatus === "Menunggu Persetujuan Formulir") {
            if ($status === "accept") {
                $updateStatus = "Formulir disetujui";
            } else if ($status === "decline") {
                $updateStatus = "Formulir ditolak";
            }
        } else if ($mitraStatus === 'Menunggu Persetujuan MOU') {
            if ($status === "accept") {
                $updateStatus = "MOU disetujui";
                User::whereId($mitra->userId)->update(
                    ['role' => 'Mitra']
                );
            } else if ($status === "decline") {
                $updateStatus = "MOU ditolak";
            }
        }

        if (isset($updateStatus)) {
            mitra::whereId($id)->update(
                ['statusPengajuan' => $updateStatus, 'pesanPersetujuan' => $request->input('pesanPersetujuan') ?? "",]
            );
            $alertTyple = $status === "accept" ? 'menyetujui' : 'menolak';
            return back()->with('success', 'Anda berhasil ' . $alertTyple . ' pengajuan' . $mitra->user->name.'.');
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
        if ($request->user()->mitra?->statusPengajuan === 'Formulir disetujui' || $request->user()->mitra?->statusPengajuan === 'MOU ditolak') {
            return $this->storeMoU($request);
        }

        $request->validate([
            'phonenumber' => ['required', 'unique:' . User::class . ',phonenumber,' . auth()->id()],
        ], [

            'phonenumber.unique' => "Nomor Hp Sudah Terdaftar"
        ]);

        if (mitra::where('userId', '!=', Auth::user()->id)->where('namaUsaha', '=', $request->namaUsaha)->count() > 0) {
            throw ValidationException::withMessages(['namaUsaha' => 'Nama Usaha Sudah Terdaftar']);
            return back();
        }

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

        $dataMitra = mitra::where('userId', '=', Auth::user()->id)->first();

        if ($dataMitra === null) {
            mitra::create([...$resBody, "userId" => Auth::user()->id, "districtId" => $district->id, "statusPengajuan" => "Menunggu Persetujuan Formulir"]);
        } else {
            $dataMitra->update(
                [
                    'address' => $request->address,
                    'alasanPengajuan' => $request->alasanPengajuan,
                    'fotoDapur' => $resBody['fotoDapur'],
                    'fotoKTP' => $request->fotoKTP,
                    'kulkas' => $request->kulkas,
                    'namaUsaha' => $request->namaUsaha,
                    'NIK' => $request->NIK,
                    'postalCode' => $request->postalCode,
                    "userId" => Auth::user()->id,
                    "districtId" => $district->id,
                    "statusPengajuan" => "Menunggu Persetujuan Formulir"
                ]
            );
        }
        return redirect(route('customer.pengajuanmitra.status'))->with('success', 'Berhasil Mengirim Form Pengajuan Mitra');
    }

    public function storeMoU(Request $request)
    {
        mitra::where('userId', '=', $request->user()->id)->update(
            ['statusPengajuan' => 'Menunggu Persetujuan MOU', 'mou' => $request->input('mou')]
        );
        return redirect(route('customer.pengajuanmitra.status'))->with('success', 'Dokumen MoU anda berhasil diunggah');
    }
}
