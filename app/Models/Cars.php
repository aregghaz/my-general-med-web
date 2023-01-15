<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Venturecraft\Revisionable\RevisionableTrait;
use Fico7489\Laravel\RevisionableUpgrade\Traits\RevisionableUpgradeTrait;

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
    ];

    public function make()
    {
        return $this->hasOne(Make::class, 'id', 'make_id');
    }

    public function model()
    {
        return $this->hasOne(MakeMOdel::class, 'id', 'model_id');
    }
    public function driver()
    {
        return $this->hasMany(Driver::class, 'car_id', 'id');
    }

    public function year()
    {
        return $this->hasOne(Year::class, 'id', 'year_id');
    }
}
