<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;
    protected $fillable=[
        'name',
        'organization',
        'releaseDate',
        'file',
        'user_id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
