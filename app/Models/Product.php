<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $filable = ['productName','productPhoto','productPrice','productType','isdeleted'];
}
