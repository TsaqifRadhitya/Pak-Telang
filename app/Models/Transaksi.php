<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasUlids;
    protected $fillable = ['ongkir', 'resi', 'status', 'paymentId', 'customerId', 'providerId'];

    public function detailTransaksis()
    {
        return $this->hasMany(DetailTransaksi::class, 'transaksi_id');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(Payment::class, 'paymentId', 'id');
    }
}
