<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable  =  [
        'id',
        'name',
        "image",
        'surname',
        'email',
        'phone_number',
        'password',
        'role',
        'state_id',
        'address',
        'birthday',
    ];
}
