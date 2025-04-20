<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class konten extends Model
{
    use HasUlids;

    protected $fillable = ['slug','content','imageCover','imageContent','video','category','author'];

    public function user(){
        $this->belongsTo(User::class,'author','id');
    }
}
