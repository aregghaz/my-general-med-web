<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Venturecraft\Revisionable\RevisionableTrait;
use Fico7489\Laravel\RevisionableUpgrade\Traits\RevisionableUpgradeTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory;
    use RevisionableTrait;
    use RevisionableUpgradeTrait;
    
    //enable this if you want use methods that gets information about creating
    protected $revisionCreationsEnabled = true;
    protected $fillable  =  [
        'id',
        'name',
        "image",
        'surname',
        'email',
        'phone_number',
        'password',
        'role_id',
        'state_id',
        'address',
        'birthday',
    ];
}
