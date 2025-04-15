<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\District;
use App\Models\mitra;
use App\Models\pengajuanMitra;
use App\Models\Province;
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
                return Inertia::render('Customer/Pengajuan Mitra/statusMouPending');
            case 'MOU ditolak':
                return Inertia::render('Customer/Pengajuan Mitra/statusMouRejected');
        }
    }

    public function statusUpdate(Request $request, $status, $id)
    {
        $mitraStatus = $request->user()->mitra->statusPengajuan;
        if ($mitraStatus === "Menunggu Persetujuan Formulir") {
            if ($status === "Approve") {
                $updateStatus = "Formulir disetujui";
            } else if ($status === "Decline") {
                $updateStatus = "Formulir ditolak";
            }
        } else if ($mitraStatus === 'Menunggu Persetujuan MOU') {
            if ($status === "Approve") {
                $updateStatus = "MOU ditolak";
            } else if ($status === "Decline") {
                $updateStatus = "MOU ditolak";
            }
        }

        if ($updateStatus) {
            mitra::whereId($id)->update(
                ['statusPengajuan' => $updateStatus, 'pesanPersetujuan' => $request->input('pesanPersetujuan')]
            );
        }
        return back()->with('success', 'Berhasil Mengubah Status Pengajuan Mitra');
    }

    public function detailPengajuan($id)
    {
        $data = mitra::whereId($id)->where('statusPengajuan', '!=', 'MOU disetujui')->first();
        if ($data) {
            return;
        }
        abort(404);
    }

    public function store(Request $request)
    {
        if ($request->user()->mitra->statusPengajuan === 'Menunggu MOU') {
            return $this->storeMoU($request);
        }
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
