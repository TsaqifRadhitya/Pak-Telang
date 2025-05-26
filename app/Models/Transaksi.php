<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasUlids;
    protected $fillable = ['ongkir', 'snapToken', 'resi', 'displayId', 'metodePengiriman', 'type', 'status', 'address', 'postalCode', 'districtId', 'paymentId', 'customerId', 'providerId'];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (!$model->getAttribute('displayId')) {
                $prefix = 'TRX';
                $tanggal = now()->format('Ymd');
                $type = $model->type === "Bahan Baku" ? "BHN" : "PRD";

                // Cari transaksi terakhir dengan format ID yang sama di hari yang sama
                $last = static::query()
                    ->where('displayId', 'like', "$prefix-$tanggal-%-$type")
                    ->orderByDesc('displayId')
                    ->first();

                if ($last) {
                    // Ambil angka urut terakhir dari ID
                    $parts = explode('-', $last->displayId);
                    $lastNumber = isset($parts[2]) ? (int) $parts[2] : 0;
                    $nextNumber = $lastNumber + 1;
                } else {
                    $nextNumber = 1;
                }

                $urut = str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
                $model->displayId = "$prefix-$tanggal-$urut-$type";
            }
        });
    }

    public function detailTransaksis()
    {
        return $this->hasMany(DetailTransaksi::class, 'transaksiId');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(Payment::class, 'paymentId', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'customerId', 'id');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'districtId', 'id');
    }
}
