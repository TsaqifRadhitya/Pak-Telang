<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUlids;
    protected $filable = ['productName','productPhoto','productPrice','productType','isdeleted','productDescription'];
}
