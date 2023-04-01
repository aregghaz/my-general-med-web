<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'client_id',
        'address',
        'address_phone',
        'address_id',
        'address_comments',
        'pick_up',
        'drop_down',
    ];
    protected $casts = [
        'pick_up'  => 'time:H:m',
        'drop_down' => 'time:H:m',
    ];
}
