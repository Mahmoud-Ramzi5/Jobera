<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class FreelancingJobCompetetor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'individual_id',
        'job_id',
        'description',
        'salary'
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
    public function freelancing_job(): BelongsTo
    {
        return $this->belongsTo(FreelancingJob::class, 'job_id', 'id');
    }

    public function individual(): BelongsTo
    {
        return $this->belongsTo(Individual::class, 'individual_id', 'id');
    }
}