<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class productDetail extends Model
{
    use HasUlids;

    protected $fillable = ['stock', 'disable', 'userId', 'variantId'];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function variant()
    {
        return $this->belongsTo(variant::class, 'variantId');
    }
}
