<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    public function cource(){
        return $this->belongsTo(Course::class);
    }
    public function rater(){
        return $this->belongsTo(User::class);
    }
}
