<?php

namespace App\Models;

use Fico7489\Laravel\RevisionableUpgrade\Traits\RevisionableUpgradeTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Venturecraft\Revisionable\RevisionableTrait;

class Clients extends Model
{
    use HasApiTokens, HasFactory;
    use RevisionableTrait;
    use RevisionableUpgradeTrait;

    //enable this if you want use methods that gets information about creating
    protected $revisionCreationsEnabled = true;
    protected $fillable = [
        "id",
        'car_id',
        'vendor_id',
        'type_id',
        'trip_id',
        'fullName',
        'gender',///seect
        'los',
        'date_of_service',
        'pick_up',
        'drop_down',
        'request_type', ///seect
        'status',///seect
        'origin',
        'origin_phone',
        'origin_id',
        'origin_comment',
        'origin_phone',
        "destination_id",
        "destination",
        "destination_phone",
        'destination_comments',
        'miles',
        'member_uniqie_identifer',
        'birthday',
        'weight',
        'height',

    ];



    public function typeOfTrip()
    {
        return $this->hasOne(TypeOfTrip::class, 'id', 'type_of_trip');
    }

    public function escortType()
    {
        return $this->hasOne(Escort::class, 'id', 'escortType');
    }

    public function escort()
    {
        return $this->hasOne(Escort::class, 'id', 'escortType');
    }

    public function genderType()
    {
        return $this->hasOne(Gender::class, 'id', 'gender');
    }

    public function clientStatus()
    {
        return $this->hasOne(ClientStatus::class, 'id', 'status');
    }

    public function requestType()
    {
        return $this->hasOne(RequestType::class, 'id', 'request_type');
    }
}
