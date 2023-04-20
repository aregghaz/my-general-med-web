<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Vendor extends Model
{
    use HasApiTokens, HasFactory;


    protected $fillable  =  [
        'name',
        'address',
        'status',
        'email',
        'phone_number',
    ];
}
