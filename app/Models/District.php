<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasUlids;

    protected $fillable = ['districtName','cityId'];

    public function city(){
        return $this->belongsTo(City::class,'cityId','id');
    }

    public function addresses(){
        return $this->hasMany(Address::class,'districtId');
    }
}
