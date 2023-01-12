<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    use HasApiTokens, HasFactory;
    use RevisionableTrait;
    use RevisionableUpgradeTrait;
    
    //enable this if you want use methods that gets information about creating
    protected $revisionCreationsEnabled = true;
    protected $fillable  =  [
        'id',
        'name',
        'slug'
    ];
}
