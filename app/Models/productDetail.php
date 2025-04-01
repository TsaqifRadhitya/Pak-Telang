<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class productDetail extends Model
{
    use HasUlids;

    protected $fillable = ['stock', 'disable', 'userId'];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'productId');
    }
}
