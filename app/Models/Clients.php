<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RequestType;
use App\Models\ClientStatus;
use App\Models\TypeOfTrip;
use App\Models\Escort;
use App\Models\OriginAddress;
use App\Models\DestinationAddress;
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
       // "id",
        'car_id',
        'vendor_id',
        'type_id' ,   
        'trip_id',
        'name',
        'surname',
        'gender',///seect
        'los',
        'phone_number',
        'date_of_service',
        'appointment_time',
        'pick_up',
        'drop_down',
        'request_type', ///seect
        'status',///seect
        'origin_id',
        "destination_id",
        'origin_comment',
        'destination_comments',
        'escortType',//select
        'type_of_trip',//select
        'miles',
        'member_uniqie_identifer',
        'birthday',
        
    ];	
    public function origin()
    {
        return $this->hasOne(OriginAddress::class, 'id', 'origin_id');
    }
    public function destination()
    {
        return $this->hasOne(DestinationAddress::class, 'id', 'destination_id');
    }
    
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
