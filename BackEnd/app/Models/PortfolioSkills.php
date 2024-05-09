<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioSkills extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'portfolio_id',
        'skill_id'
    ];

    public function portfolio() {
        return $this->belongsTo(Portfolio::class);
    }

    public function skill() {
        return $this->belongsTo(Skill::class);
    }
}
