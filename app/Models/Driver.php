<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'car_id',
        'user_id',
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
        'drug_test',
        'sex_offender_check_exp',
        'motor_vehicle_record_exp',
        'license_exp',
        'defensive_driving_exp',
        'wheelchair_securement_exp',
        'pass_basic_exp',
        'emt_1_exp',
        'first_aid_exp',
        'company_training_exp',
        'drug_test_exp',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
