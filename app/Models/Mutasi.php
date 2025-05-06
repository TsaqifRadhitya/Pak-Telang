<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Mutasi extends Model
{
    use HasUlids;
    protected $fillable = ['nominal', 'bukti', 'finished', 'userId', 'paymentId', 'type', 'transaksiId'];

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'paymentId');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
