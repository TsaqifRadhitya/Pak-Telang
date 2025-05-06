<?php

namespace App\Http\Controllers;

use App\Models\Mutasi;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class ewalletController extends Controller
{
    public function index()
    {
        $User  = Auth::user();
        if ($User->role === "Pak Telang") {
            $saldo = User::sum('saldo');
            $mutations = Mutasi::with(['user', 'payment'])->where('type', 'Penarikan')->orderBy('created_at','desc')->get();
            return Inertia::render('Pak Telang/EWallet/index', compact('saldo', 'mutations'));
        } else {
            $mutations = Mutasi::where('userId', $User->id)->orderBy('created_at','desc')->get();
            return Inertia::render('Mitra/Ewallet/index', compact('mutations'));
        }
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $payment = Payment::create([
            'number' => $request->number,
            'ownerName' => $request->ownerName,
            'provider' => $request->provider,
            'type' => $request->type,
        ]);

        $user->update(
            ['saldo' => $user->saldo - $request->nominal]
        );

        Mutasi::create([
            'finished' => false,
            'nominal' => $request->nominal,
            'userId' => $user->id,
            'type' => 'Penarikan',
            'paymentId' => $payment->id,
        ]);

        return back()->with('success', 'Berhasil membuat pengajuan pencarian dana');
    }

    public function update(Request $request,$id) {
        Mutasi::whereId($id)->update([
            'finished' => true,
            'bukti' => $request->bukti
        ]);

        return back()->with('success','Berhasil mentransfer pencairan dana');
    }
}
