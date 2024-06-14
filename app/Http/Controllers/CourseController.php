<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id', 
        ]);

        $user = Auth::user();

        $course = new Course();
        $course->title = $validatedData['title'];
        $course->category_id = $validatedData['category_id'];
        $course->user_id = $user->id;
        
        $course->save();

        $course->load([
                    'creator',
                    'students',
                    'category',
                    'requirements',
                    'objectives',
                    'sections',
                    'rating',
                    'courseFor'
        ]);

        return Inertia::render('EditCourse',['course' => $course]);
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
                        'courseFor'
                    ])
                    ->withAvg('rating', 'rating')
                    ->findOrFail($id);
        
        $user = auth()->user()->load('courses', 'cartCourses', 'enrolledCourses');

        return Inertia::render("CoursePage", [
            "course"=> $course,
        ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $course = Course::with([
                    'creator',
                    'students',
                    'category',
                    'requirements',
                    'objectives',
                    'sections',
                    'sections.lectures',
                    'rating',
                    'courseFor'])->find($id);

        return Inertia::render("EditCourse", ['course'=>$course]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'short_desc' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'preview_video' => 'nullable|mimes:mp4|max:10240',
            'objectives' => 'array',
            'requirements' => 'array',
            'courseFor' => 'array',
            'sections' => 'array',
        ]);

        $course = Course::findOrFail($id);
        $course->title = $validatedData['title'];
        $course->short_desc = $validatedData['short_desc'];
        $course->description = $validatedData['description'];
        $course->price = $validatedData['price'];

        if (isset($validatedData['image'])) {
            $image = $request->file('image');
            $uniqueImageName = uniqid() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('course_images', $uniqueImageName, 'public');
            $course->image_path = $imagePath;
        }
        if (isset($validatedData['preview_video'])) {
            $previewVideo = $request->file('preview_video');
            $uniqueVideoName = uniqid() . '_' . $previewVideo->getClientOriginalName();
            $previewVideoPath = $previewVideo->storeAs('course_previews', $uniqueVideoName, 'public');
            $course->preview_path = $previewVideoPath;
        }
        
        $course->objectives()->delete();
        foreach ($validatedData['objectives'] as $objective) {
            if(strlen($objective['text'])>0){
                $course->objectives()->create(['text' => $objective['text']]);

            }
        }
        
        $course->requirements()->delete();
        foreach ($validatedData['requirements'] as $requirement) {
            if(strlen($requirement['text'])>0){
                $course->requirements()->create(['text' => $requirement['text']]);

            }
        }

        $course->courseFor()->delete();
        foreach ($validatedData['courseFor'] as $courseFor) {
            if( strlen($courseFor['text'])>0){
                $course->courseFor()->create(['text' => $courseFor['text']]);

            }
        }


        $course->sections()->delete();
        foreach ($validatedData['sections'] as $section) {
            $newSection = $course->sections()->create(['title' => $section['title']]);
            foreach ($section['lectures'] as $lecture) {
                if($lecture['title'] && $lecture['type']){
                    $path = "/app_images/default-course-image.jpg"; 
                    if (isset($lecture['file'])) {
                        $file = $lecture['file'];
                        $uniqueFileName = uniqid() . '_' . $file->getClientOriginalName(); 
                        $filePath = $file->storeAs('lectures', $uniqueFileName, 'public'); 
                        $path = $filePath;
                    }
                    $newLecture = $newSection->lectures()->create([
                        'title' => $lecture['title'],
                        'type' => $lecture['type'] || "video",
                        'path' => $path,
                    ]);

                }
            }
        }
        $course->save();

        return to_route('instructor');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }

    public function addtocart(Request $request, $id)
    {
        // Validate the incoming request data with custom messages
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ], [
            'course_id.required' => 'The course ID is required.',
            'course_id.exists' => 'The selected course does not exist.',
        ]);

        $user = Auth::user();
        
        if (!($user->cartCourses()->where('course_id', $id)->exists() || $user->enrolledCourses()->where('course_id',$id)->exists())) {
            $user->cartCourses()->attach($id, ['status' => 'cart']);
        }

        return redirect()->back()->with('message', 'Course added to cart successfully');
    }

    public function enroll(Request $request, $id){
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ], [
            'course_id.required' => 'The course ID is required.',
            'course_id.exists' => 'The selected course does not exist.',
        ]);
        $user = Auth::user();
        if(!$user->enrolledCourses()->where('course_id',$id)->exists()){
            if ($user->cartCourses()->where('course_id', $id)->exists()) {
                $user->cartCourses()->detach($id);
            }
            $user->enrolledCourses()->attach($id, ['status' => 'enrolled']);
        }
        return redirect()->back()->with('message', 'Course enrolled successfully');
    }
    public function enrollall(){
        $user = Auth::user();
        $cart_courses = $user->cartCourses()->get();
        foreach($cart_courses as $course){
            if(!$user->enrolledCourses()->where('course_id',$course->id)->exists()){
                $user->enrolledCourses()->attach($course->id,['status' => 'enrolled']);

            }
        }
        $user->cartCourses()->detach();
        return redirect()->back();
    }
}
