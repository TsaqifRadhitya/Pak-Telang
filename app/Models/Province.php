<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasUlids;

    protected $fillable = ['province'];

    public function citys(){
        return $this->hasMany('cities','provinceId','id');
    }
}
