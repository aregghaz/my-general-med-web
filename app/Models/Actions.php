<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actions extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id',
        'client_id',
        'vendor_id',
        'action',
    ];
    public function getClient(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Clients::class, 'id', 'client_id');
    }
    public function getOperator(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function getVendor(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'vendor_id');
    }
    public function getAction(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ActionStatus::class, 'id', 'action');
    }
}
