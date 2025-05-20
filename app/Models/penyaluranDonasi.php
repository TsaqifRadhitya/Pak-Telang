<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class penyaluranDonasi extends Model
{
    use HasUlids;

    protected $fillable = ['nominal','jumlahProduk','namaPenyaluran'];

}
