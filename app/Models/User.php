<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phonenumber',
        'profile_picture',
        'role',
        'gender',
        'birthday',
        'address',
        'saldo',
        'postalCode',
        'districtId'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function productStocks()
    {
        return $this->hasMany(productDetail::class, 'userId');
    }

    public function mitra()
    {
        return $this->hasOne(mitra::class, 'userId');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'districtId');
    }

    public function messageSend()
    {
        return $this->hasMany(Message::class, 'from', 'id');
    }

    public function messageReceives()
    {
        return $this->hasMany(Message::class, 'to', 'id');
    }
}
