<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "user_id",
        "level",
        "field",
        "school",
        "start_date",
        "end_date",
        "certificate_file"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
