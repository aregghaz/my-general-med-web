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
        'vendor_id',
        'phone_number',
        'password',
        'role_id',
        'address',
        'birthday',
    ];
    public function role()
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }
    public function fields()
    {
        return $this->BelongsToMany(ClientTable::class, 'user_fields', 'user_id', 'field_id');
    }
    public function driver()
    {
        return $this->hasOne(Driver::class, 'user_id', 'id');
    }
    public function Company()
    {
        return $this->hasOne(User::class, 'id', 'vendor_id');
    }    public function los()
    {
        return $this->belongsToMany(Los::class, 'vendor_los');
    }

}
