<?php

namespace App\Http\Controllers;

use App\Mail\donasiMail;
use App\Mail\newTransaction;
use App\Models\donasi;
use App\Models\productDetail;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class C_Midtrans extends Controller
{
    public function callback(Request $request)
    {
        $hashedKey = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . env('VITE_MIDTRANS_SERVER_KEY'));

        if ($hashedKey !== $request->signature_key) {
            return response()->json(['message' => 'Invalid signature key'], 403);
        }

        if ($request->transaction_status === "settlement") {
            $transaksi = Transaksi::where('id', $request->order_id)->where('status', 'Menunggu Pembayaran')->update(
                ['status' => 'Sedang Diproses']
            );
            $transaksi = Transaksi::where('id', $request->order_id)->first();
            if ($transaksi?->type === "Bahan Baku") {
                Mail::to(User::find($transaksi->providerId)->email)->send(new newTransaction(route('admin.transaksi.show', ['id' => $transaksi->id])));
            }

            $donasiData =  donasi::find($request->order_id);

            if ($donasiData) {
                $donasiData->update(
                    ['status' => 'paid']
                );
                Mail::to($donasiData->email)->send(new donasiMail());
            }
        }

        if ($request->transaction_status === "expired") {
            donasi::where('id', $request->order_id)->update(
                ['status' => 'failed']
            );
        }
        return response()->json(['message' => 'Callback received successfully']);
    }
}
