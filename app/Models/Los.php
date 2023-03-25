<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Los extends Model
{
    use HasFactory;
    protected $fillable  =  [
        'id',
        'name',
        'slug'
    ];

    public function services()
    {
        return $this->belongsToMany(Service::class, 'los_services','los_id','service_id');
    }
}
