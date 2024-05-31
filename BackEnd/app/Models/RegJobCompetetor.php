<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegJobCompetetor extends Model
{
    use HasFactory;
    protected $fillable=[
        'individual_id','job_id',
        "description"
    ];
}
