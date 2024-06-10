<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PHPUnit\Framework\Constraint\Count;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request )
    {
        $id =25;

        return to_route('course.edit',['id' => $id]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $course = Course::with([
                        'creator',
                        'students',
                        'category',
                        'requirements',
                        'sections.lectures',
                        'rating',
                        'for'
                    ])
                    ->withAvg('rating', 'rating')
                    ->findOrFail($id);

        return Inertia::render("CoursePage", [
            "course"=> $course
        ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $course = Course::find($id);

        return Inertia::render("EditCourse", [
            "course"=> $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
