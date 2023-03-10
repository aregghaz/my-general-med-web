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
        'operator_id',
        'price',
        'type_id',
        'trip_id',
        'fullName',
        'gender',///seect
        'los_id',
        'start_time',
        'end_time',
        'date_of_service',
        'pick_up',
        'drop_down',
        'request_type', ///seect
      ///  'status',///seect
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
        'additionalNote',
        'operator_note',
        'reason_id',

    ];



    public function typeOfTrip()
    {
        return $this->hasOne(TypeOfTrip::class, 'id', 'type_of_trip');
    }
    public function car()
    {
        return $this->hasOne(Cars::class, 'id', 'car_id');
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
        return $this->hasOne(ClientStatus::class, 'id', 'type_id');
    }

    public function requestType()
    {
        return $this->hasOne(RequestType::class, 'id', 'request_type');
    }
    public function waiteDuration()
    {
        return $this->hasOne(WaitDuration::class, 'id', 'duration_id');
    }
    public function artificial()
    {
        return $this->hasOne(Artificial::class, 'id', 'artificial_id');
    }
    public function los()
    {
        return $this->hasOne(Los::class, 'id', 'los_id');
    }
}
