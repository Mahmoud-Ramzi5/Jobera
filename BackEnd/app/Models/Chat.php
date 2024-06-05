<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user1_id',
        'user2_id',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    public function messages(){
        return $this->hasMany(Message::class,'chat_id','id');
    }
}
