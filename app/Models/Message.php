<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasUuids;

    protected $fillable = ['message', 'isReaded', 'from', 'to', 'image'];

    public function sender()
    {
        return $this->belongsTo(User::class, 'from');
    }
}
