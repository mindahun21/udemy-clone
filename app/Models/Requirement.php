<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'course_id'];

    public function course(){
        return $this->belongsTo(Course::class);
    }
    
}
