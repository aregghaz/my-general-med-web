<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;
    protected $fillable  =  [
        'id',
        'car_id',
      'license',
      'picture',
      'sex_offender_check',
      'motor_vehicle_record',
      'defensive_driving',
      'wheelchair_securement',
      'pass_basic',
      'emt_1',
      'first_aid',
      'company_training',
      'drug_test'

    ];
}
