<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Company extends User
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The "boot" method of the model.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();
        self::deleting(function (Company $company) { // before delete() method call this
            $company->regJobs()->each(function ($job) {
                $job->defJob->delete(); // <-- direct deletion
            });
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'field',
        'founding_date',
        'user_id'
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
        return [];
    }

    /* Relations */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function regJobs(): HasMany
    {
        return $this->hasMany(RegJob::class);
    }
}
