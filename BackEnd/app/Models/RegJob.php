<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'defJob_id',
        'accepted_individual'
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
            'salary' => 'decimal:2'
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

    public function competitors(): HasMany
    {
        return $this->hasMany(RegJobCompetitor::class, 'job_id', 'id');
    }
}
