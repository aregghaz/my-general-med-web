<?php

namespace App\Models;

use Fico7489\Laravel\RevisionableUpgrade\Traits\RevisionableUpgradeTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Venturecraft\Revisionable\RevisionableTrait;

class Cars extends Model
{
    use HasApiTokens, HasFactory;
    use RevisionableTrait;
    use RevisionableUpgradeTrait;

    //enable this if you want use methods that gets information about creating
    protected $revisionCreationsEnabled = true;
    protected $fillable = [
        'vendor_id',
        'make_id',
        'model_id',
        'year_id',
        'registration',
        'inspection',
        'insurance',
        'liability',
        'inspection_exp',
        'insurance_exp',
        'liability_exp'
    ];

    public function make()
    {
        return $this->hasOne(Make::class, 'id', 'make_id');
    }

    public function model()
    {
        return $this->hasOne(MakeModel::class, 'id', 'model_id');
    }

    public function driver()
    {
        return $this->hasMany(Driver::class, 'car_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(CarImages::class, 'car_id', 'id');
    }

    public function year()
    {
        return $this->hasOne(Year::class, 'id', 'year_id');
    }
}
