<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Enums\RegisterStep;

class Individual extends User
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'birth_date',
        'gender',
        'type',
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
        return [

        ];
    }

    /* Special Function */
    public function register_step()
    {
        if (count($this->skills) == 0) {
            $step = RegisterStep::SKILLS;
        } else if ($this->education == null) {
            $step = RegisterStep::EDUCATION;
        } else if (count($this->certificates) == 0) {
            $step = RegisterStep::CERTIFICATES;
        } else if (count($this->portfolios) == 0) {
            $step = RegisterStep::PORTFOLIO;
        } else {
            $step = RegisterStep::DONE;
        }

        return $step;
    }

    /* Relations */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'individual_skill', 'individual_id', 'skill_id')->withTimestamps();
    }

    public function education(): HasOne
    {
        return $this->hasOne(Education::class, 'individual_id', 'id');
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class, 'individual_id', 'id');
    }
}
