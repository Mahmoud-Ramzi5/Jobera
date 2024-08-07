<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /* Relations */
    public function individuals(): BelongsToMany
    {
        return $this->belongsToMany(Individual::class, 'individual_skill', 'skill_id', 'individual_id')->withTimestamps();
    }

    public function portfolios(): BelongsToMany
    {
        return $this->belongsToMany(Portfolio::class, 'portfolio_skill', 'skill_id', 'portfolio_id')->withTimestamps();
    }

    public function defJobs(): BelongsToMany
    {
        return $this->belongsToMany(DefJob::class, 'def_job_skill', 'skill_id', 'job_id')->withTimestamps();
    }
}
