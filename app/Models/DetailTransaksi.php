<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    use HasUlids;

    protected $fillable = ['amount', 'subTotal', 'transaksiId', 'productId'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
