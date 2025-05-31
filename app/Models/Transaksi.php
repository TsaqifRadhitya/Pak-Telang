<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Transaksi extends Model
{
    use HasUlids;
    protected $fillable = ['ongkir', 'snapToken', 'resi', 'displayId', 'metodePengiriman', 'type', 'status', 'address', 'postalCode', 'districtId', 'customerId', 'providerId'];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (!$model->getAttribute('displayId')) {
                $prefix = 'TRX';
                $type = $model->type === "Bahan Baku" ? "BHN" : "PRD";

                do {
                    $random = Str::upper(Str::random(8));
                    $displayId = "$prefix-$random-$type";
                } while (static::where('displayId', $displayId)->exists());

                $model->displayId = $displayId;
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
