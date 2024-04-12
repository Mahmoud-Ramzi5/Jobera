<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSkills extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'skill_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function skill() {
        return $this->belongsTo(Skill::class);
    }
}
