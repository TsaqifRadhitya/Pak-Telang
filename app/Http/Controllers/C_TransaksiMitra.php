<?php

namespace App\Http\Controllers;

use App\Models\DetailTransaksi;
use App\Models\productDetail;
use App\Models\Transaksi;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class C_TransaksiMitra extends Controller
{
    public function index(Request $request)
    {
        $section = $request->q;
        return Inertia::render('Mitra/Transaksi/V_HalPesanan', [
            'section' => $section,
            'pesananDiterima' => Inertia::defer(fn() => $this->loadIndexPesananDiterima(), 'pesananDiterima'),
            'Dipesan' => Inertia::defer(fn() => $this->loadIndexDipesan(), 'Dipesan'),
            'Riwayat' => Inertia::defer(fn() => $this->loadIndexRiwayat(), 'Riwayat'),
            'providerAddress' => $this->getFullAdressProvider(),
            'stock' => Auth::user()->productStocks,
            'pesananMasuk' => Inertia::defer(fn() => $this->loadIndexPesananMasuk(), 'pesananMasuk'),
        ]);
    }

    private function loadIndexPesananMasuk()
    {
        if (!Auth::user()->mitra->isOpen) {
            return null;
        }

        return Transaksi::with(['detailTransaksis.product', 'user.district.city'])
            ->whereNull('providerId')
            ->orderBy('created_at', 'desc')
            ->simplePaginate(5)
            ->through(function ($item) {
                $total = $item->detailTransaksis->sum('subTotal');
                return [...$item->toArray(), 'Total' => $total, 'address' => $this->getFullAdress($item)];
            });
    }

    private function loadIndexPesananDiterima()
    {
        return Transaksi::with('detailTransaksis.product')
            ->whereIn('status', ['Menunggu Konfirmasi', 'Menunggu Pembayaran'])
            ->where('providerId', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->simplePaginate(5)
            ->through(function ($item) {
                return [...$item->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $item->id)->sum('subTotal'), 'address' => $this->getFullAdress($item)];
            });
    }

    private function loadIndexDipesan()
    {
        return Transaksi::with('detailTransaksis.product')
            ->whereIn('status', ['Menunggu Pembayaran', 'Sedang Diproses', 'Sedang Dikirim'])
            ->where('customerId', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->simplePaginate(5)
            ->through(function ($item) {
                return [...$item->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $item->id)->sum('subTotal')];
            });
    }

    private function loadIndexRiwayat()
    {
        $user = Auth::user()->id;

        return Transaksi::with('detailTransaksis.product')
            ->where(function ($e) use ($user) {
                $e->where('status', 'Pembayaran Gagal')->where('customerId', $user);
            })
            ->orWhere(function ($t) use ($user) {
                $t->where('status', 'Selesai')
                    ->where('providerId', $user);
            })
            ->orderBy('created_at', 'desc')
            ->simplePaginate(5)
            ->through(function ($item) {
                return [...$item->toArray(), 'Total' => DetailTransaksi::where('transaksiId', $item->id)->sum('subTotal')];
            });
    }


    private function getFullAdressProvider()
    {
        $district = Auth::user()->mitra->district;
        $city = $district->city;
        $province = $city->province;
        return [
            'address' => Auth::user()->address,
            'postalCode' =>  Auth::user()->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }


    private function getFullAdress(Transaksi $transaksi)
    {

        $district = $transaksi->district;
        $city = $district->city;
        $province = $city->province;
        return [
            'address' => $transaksi->address,
            'postalCode' =>  $transaksi->postalCode,
            'districtName' => $district?->districtName,
            'cityName' => $city->cityName,
            'province' => $province->province,
        ];
    }

    public function show($id)
    {
        $transaction = Transaksi::with(['detailTransaksis.product', 'user'])->where('id', $id)->first();
        $role = Auth::user()->role;
        if ($role === "Pak Telang") {
            return redirect()->route('admin.transaksi.show', ['id' => $id]);
        }
        if ($role === "Customer") {
            abort(403);
        }
        if ($transaction?->status === "Menunggu Pembayaran" && $transaction?->type === "Bahan Baku") {
            return redirect(route('mitra.order bahan.payment', ["id" => $id]));
        } else if ($transaction) {
            if (!$transaction->providerId || $transaction->providerId != Auth::user()->id && $transaction->customerId != Auth::user()->id) {
                $section = "Pesanan Masuk";
            } else if ($transaction->status === "Gagal menemukan provider") {
                return redirect()->route('mitra.transaksi')->with('error', 'transaksi sudah tidak tersedia');
            } else if ($transaction->providerId === Auth::user()->id && $transaction->status !== "Selesai" && $transaction->status !==  "Pembayaran Gagal") {
                $section = "Pesanan Diterima";
            } else if ($transaction?->type === "Bahan Baku" && $transaction->status !== "Pembayaran Gagal") {
                $section = "Dipesan";
            } else {
                $section = "Riwayat";
            }

            $transaction = [
                ...$transaction->toArray(),
                "address" => $this->getFullAdress($transaction),
                "Total" => DetailTransaksi::where('transaksiId', $transaction->id)->sum('subTotal'),
            ];

            $providerAddress = $this->getFullAdressProvider();

            return Inertia::render('Mitra/Transaksi/V_HalDetailPesanan', compact('section', 'transaction', 'providerAddress'));
        }
        abort(404);
    }

    public function update(Transaksi $id, Request $request)
    {
        if (!$id->providerId) {
            DB::beginTransaction();
            try {
                // Ambil semua detail transaksi
                $details = $id->detailTransaksis;

                // Cek stok terlebih dahulu
                foreach ($details as $detail) {
                    $product = productDetail::where('productId', $detail->productId)->lockForUpdate()->first();
                    if ($product->stock < $detail->amount) {
                        DB::rollBack();
                        return back()->with('error', "Stok produk ID {$detail->productId} tidak mencukupi.");
                    }
                }

                // Kurangi stok jika semua mencukupi
                foreach ($details as $detail) {
                    $product = productDetail::where('productId', $detail->productId)->first();
                    $product->decrement('stock', $detail->amount);
                }

                // Set providerId ke user saat ini

                DB::commit();
                Config::$serverKey = env("VITE_MIDTRANS_SERVER_KEY");
                Config::$isProduction = false;
                $time = now();
                $ress = Snap::createTransaction([
                    "transaction_details" => [
                        "order_id" => $id->id,
                        "gross_amount" => $request->ongkir + DetailTransaksi::where('transaksiId', $id->id)->sum('subTotal')
                    ],
                    "callbacks" => [
                        "finish" => route('customer.transaksi.show', ["id" => $id]),
                        "error" => route('customer.transaksi.show', ["id" => $id])
                    ],
                    "expiry" =>  [
                        "start_time" => $time->format('Y-m-d H:i:s O'),
                        "unit" => "hour",
                        "duration" => 12
                    ]
                ]);
                $id->update([
                    'providerId' => Auth::user()->id,
                    'status' => 'Menunggu Pembayaran',
                    'ongkir' => $request->ongkir,
                    'snapToken' => $ress->token,
                    'updated_at' => $time
                ]);
                return back()->with('success', 'Pesanan  berhasil diterima. Segera proses pesanan ini');
            } catch (\Exception $e) {
                DB::rollBack();
                return back()->with('error', 'Gagal memproses pesanan: ' . $e->getMessage());
            }
        }

        if ($id->status == "Sedang Diproses" && $id->providerId === Auth::user()->id) {
            $id->update([
                'status' => 'Sedang Dikirim'
            ]);
            return back()->with('success', 'Status pengiriman berhasil diperbarui');
        }

        return back()->with('error', 'Pesanan sudah diambil penyedia lain');
    }
}
