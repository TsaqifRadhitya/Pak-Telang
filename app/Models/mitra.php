<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mitra extends Model
{
    /** @use HasFactory<\Database\Factories\MitraFactory> */
    use HasFactory,HasUlids;

    protected $fillable = ['namaUsaha', 'fotoKTP','NIK', 'fotoDapur', 'alasanPengajuan', 'kulkas', 'mou', 'address', 'postalCode', 'pesanPersetujuan', 'statusPengajuan','isOpen', 'districtId', 'userId'];

    public function user(){
        return $this->belongsTo(User::class,'userId');
    }

    public function district(){
        return $this->belongsTo(District::class,'districtId');
    }
}
