<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Support\Facades\Auth;


use Illuminate\Http\Request;
use Inertia\Inertia;

class InstructorController extends Controller
{
    public function index(){
        $user = Auth::user();
        if(!$user){
            return to_route('login');
        }
        if(!$user->role){
            $user->role = 'lecturer';
            $user->save();
        }
        $courses = Course::with([
                            'creator',
                            'students',
                            'category',
                            'requirements',
                            'sections',
                            'rating',
                            'for'
                        ])
                        ->where('creator_id', $user->id)
                        ->withAvg('rating', 'rating')
                        ->withCount('rating')
                        ->orderByDesc('rating_avg_rating')
                        ->get();
        return Inertia::render('Instructor',[
            'courses' => $courses,
        ]);
    }
}
