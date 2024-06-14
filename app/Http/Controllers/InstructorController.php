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
        if($user->role === 'student'){
            $user->role = 'lecturer';
            $user->save();
        }

        return Inertia::render('Instructor',[]);
    }
}
