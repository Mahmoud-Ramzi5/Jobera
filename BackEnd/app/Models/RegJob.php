<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class RegJob extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'salary',
        'type',
        'company_id',
        'accepted_individual',
        'defJob_id'
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

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [

        ];
    }

    /* Relations */
    public function defJob(): BelongsTo
    {
        return $this->belongsTo(DefJob::class, 'defJob_id', 'id');
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function acceptedIndividual(): BelongsTo
    {
        return $this->belongsTo(Individual::class, 'accepted_individual', 'id');
    }

    public function competetors(): HasMany
    {
        return $this->hasMany(RegJobCompetetor::class, 'job_id', 'id');
    }

    public function skills():BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'reg_job_skill', 'job_id', 'skill_id')->withTimestamps();
    }
}
