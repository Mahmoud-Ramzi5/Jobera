<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userSkills extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id','skill_id'
    ];
    public function user(){
        return $this->belongsToOne(User::class);
    }
    public function skill(){
        return $this->belongsToOne(Skill::class);
    }
}
