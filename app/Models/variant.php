<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class variant extends Model
{
    use HasUlids;

    protected $fillabel = ['variantName','variantPrice','netto','unit','isDeleted','productId'];

    public function product(){
        return $this->belongsTo(Product::class,'productId');
    }

    public function variantStocks(){
        return $this->hasMany(productDetail::class,'productId');
    }
}
