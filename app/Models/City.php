<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasUlids;
    protected $fillable = ['cityName','provinceId'];

    public function province(){
        return $this->belongsTo(Province::class,'provinceId','id');
    }

    public function districts(){
        return $this->hasMany('districts','cityId','id');
    }
}
