<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUlids;
    protected $fillable = ['productName','productPrice','productNetto','productUnit','productPhoto','productType','isdeleted','productDescription'];

    public function productStocks(){
        return $this->hasMany(productDetail::class,'productId');
    }
}
