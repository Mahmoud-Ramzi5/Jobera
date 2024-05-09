<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioFile extends Model
{
    use HasFactory;
    protected $fillable=[
        'potfolio_id','file'
    ];
    public function portfolio(){
        return $this->belongsTo(Portfolio::class);
    }
}
