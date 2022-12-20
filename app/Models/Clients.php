<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Venturecraft\Revisionable\RevisionableTrait;
use Fico7489\Laravel\RevisionableUpgrade\Traits\RevisionableUpgradeTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
class Clients extends Model
{
    use HasApiTokens, HasFactory;
    use RevisionableTrait;
    use RevisionableUpgradeTrait;

    //enable this if you want use methods that gets information about creating
    protected $revisionCreationsEnabled = true;
    protected $fillable  =  [
        'name',
        'surname',
        'email',
        "client_id",
        'driver_id',
        'vendor_id',
        'pick_up_address',
        'drop_down_address',
        'apartament_number',
        'id_number',
        'birthday',
        'status',
        'cnn',
        'phone_number',
        'pick_up',
        'drop_down'
    ];


}
