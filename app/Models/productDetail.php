<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class productDetail extends Model
{
    use HasUlids;

    protected $fillable = ['stock','disable','productId','userId'];

}
