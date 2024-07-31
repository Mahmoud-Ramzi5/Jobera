<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'phone_number',
        'password',
        'state_id',
        'description',
        'avatar_photo',
        'rating'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'review' => 'decimal:2',
            'email_verified_at' => 'datetime',
        ];
    }

    /* Relations */
    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class, 'user_id', 'id');
    }

    public function providers(): HasMany
    {
        return $this->hasMany(Provider::class, 'user_id', 'id');
    }

    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class, 'state_id', 'state_id');
    }

    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class, 'user_id', 'id');
    }

    public function reviewed(): HasMany
    {
        return $this->hasMany(Review::class, 'reviewer_id', 'id');
    }

    public function reviewedBy(): HasMany
    {
        return $this->hasMany(Review::class, 'reviewed_id', 'id');
    }

    public function redeemCodes(): HasMany
    {
        return $this->hasMany(RedeemCode::class, 'user_id', 'id');
    }

    public function as_FreelancingCompetitor(): HasMany
    {
        return $this->hasMany(FreelancingJobCompetitor::class, 'user_id', 'id');
    }

    public function bookmarkedJobs(): BelongsToMany
    {
        return $this->BelongsToMany(defJob::class, 'bookmarked_jobs', 'user_id', 'defJob_id')->withTimestamps();
    }
}
