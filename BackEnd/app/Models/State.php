<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'state_id',
        'state_name',
        'country_id',
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

    public function country() {
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    public function users() {
        return $this->hasMany(User::class, 'state_id', 'state_id');
    }

    public function companies() {
        return $this->hasMany(Company::class, 'state_id', 'state_id');
    }
}
