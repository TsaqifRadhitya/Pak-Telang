<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUlids;
    protected $filable = ['productName','productPhoto','productType','isdeleted','productDescription'];

    public function variants(){
        return $this->hasMany(variant::class,'productId');
    }
}
