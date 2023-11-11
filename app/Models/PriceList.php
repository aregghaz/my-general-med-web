<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceList extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'id',
        'service_id',
        'price',
        'type',
        'vendor_id',
        'los_id',
    ];
}
