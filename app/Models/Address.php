<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasUlids;
    protected $fillable = ['address', 'postalCode', 'districtId', 'userId'];

    public function district()
    {
        return $this->belongsTo(District::class, 'districtId', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
