<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasUlids;
    protected $fillable = ['ownerName', 'type', 'transaksiId', 'number', 'provider', 'e-Wallet', 'bank'];
}
