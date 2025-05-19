<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasUlids;

    protected $fillable = ['message','isReaded','from','to','isReaded'];

    public function sender(){
        return $this->belongsTo(User::class,'from');
    }
}
