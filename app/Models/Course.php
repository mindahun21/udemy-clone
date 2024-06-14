<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory;

    public function creator(){
        return $this->belongsTo(User::class, 'user_id');

    }
    public function students(){
        return $this->belongsToMany(User::class, 'course_user', 'course_id', 'user_id');
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function requirements(){
        return $this->hasMany(Requirement::class);
    }
    public function objectives(){
        return $this->hasMany(Objective::class);
    }
    public function sections(){
        return $this->hasMany(Section::class);
    }
    public function rating(){
        return $this->hasMany(Rating::class);
    }
    public function courseFor(){
        return $this->hasMany(CourseFor::class);
    }
    public function avgRating(){
        $ratings = $this->rating();
        if($ratings->count() ===0 ){
            return 0;
        }
        return $ratings->avg('rating');
    }
}
