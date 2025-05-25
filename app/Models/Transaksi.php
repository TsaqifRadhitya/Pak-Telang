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
            if (!$model->displayId) {
                $prefix = 'TRX';
                $tanggal = now()->format('Ymd');

                // Ambil transaksi terakhir dengan prefix dan tanggal yang sama
                $last = static::where('displayId', 'like', "$prefix-$tanggal-%")
                    ->orderByDesc('displayId')
                    ->first();

                if ($last) {
                    $lastNumber = (int) substr($last->displayId, -3);
                    $nextNumber = $lastNumber + 1;
                } else {
                    $nextNumber = 1;
                }

                $urut = str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
                $model->displayId = "$prefix-$tanggal-$urut";
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
