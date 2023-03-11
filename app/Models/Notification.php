<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'value_id',
        'field',
        'new',
        'type_id',
        'model'
    ];
    public function getAction(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ActionStatus::class, 'id', 'type_id');
    }
}
