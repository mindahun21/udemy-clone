<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Rating;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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


    public function learn(Request $request, $id)
    {
         $course = Course::with([
                    'creator',
                    'students',
                    'category',
                    'requirements',
                    'objectives',
                    'sections',
                    'sections.lectures',
                    'rating.user',
                    'courseFor'])->find($id);

        return Inertia::render("Learn", ['course'=>$course]);
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
                        'objectives',
                        'sections.lectures',
                        'rating.user',
                        'courseFor'
                    ])
                    ->withAvg('rating', 'rating')
                    ->findOrFail($id);
        

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
            'title' => 'nullable|string',
            'short_desc' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'image_path' => 'nullable|string',
            'preview_path' => 'nullable|string',
            'prev_video' => 'nullable|file|mimes:mp4,mov,avi,flv,webm|max:20480',
            'price' => 'numeric',
            'objectives' => 'array',
            'objectives.*.id' => 'nullable',
            'objectives.*.text' => 'nullable|string',
            'requirements' => 'array',
            'requirements.*.id' => 'nullable',
            'requirements.*.text' => 'nullable|string',
            'courseFor' => 'array',
            'courseFor.*.id' => 'nullable',
            'courseFor.*.text' => 'nullable|string',
            'sections' => 'array',
            'sections.*.id' => 'nullable',
            'sections.*.title' => 'nullable|string',
            'sections.*.lectures' => 'array',
            'sections.*.lectures.*.id' => 'nullable',
            'sections.*.lectures.*.title' => 'nullable|string',
            'sections.*.lectures.*.type' => 'nullable|string',
            'sections.*.lectures.*.file' => 'nullable',   
            'sections.*.lectures.*.path' => 'nullable|string',     
        ]);


        $course = Course::findOrFail($id);
        
        if($validatedData['title']){
            $course->title = $validatedData['title'];
        }
        if($validatedData['short_desc']){
            $course->short_desc = $validatedData['short_desc'];
        }
        if($validatedData['description']){
            $course->description = $validatedData['description'];
        }
        if($validatedData['price']){
            $course->price = $validatedData['price'];
        }

        // update the image
        if ($request->hasFile('image')) {
            $originalFileName = $validatedData['image']->getClientOriginalName();
            $imageName = time() . '_' . $originalFileName;

            if ($course->image_path) {
                $previousImagePath = public_path($course->image_path);
                if (file_exists($previousImagePath)) {
                    unlink($previousImagePath);
                }
            }

            $validatedData['image']->move(public_path('course_images'), $imageName);

            $course->image_path = "/course_images/" . $imageName;
        }

        if ($request->hasFile('prev_video')) {
            $originalFileName = $validatedData['prev_video']->getClientOriginalName();
            $videoName = time() .'_'. $originalFileName;
            if($course->preview_path){
                $previewVideoPath = public_path($course->preview_path);
                if(file_exists($previewVideoPath)){
                    unlink($previewVideoPath);
                }
            }
            
            $validatedData['prev_video']->move(public_path('course_previews'), $videoName);

            $course->preview_path = "/course_previews/".$videoName;
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


            // Update sections and lectures
        $existingSections = $course->sections->keyBy('id');
        $updatedSectionIds = [];

        foreach ($validatedData['sections'] as $sectionData) {
            if (strlen($sectionData['title']) > 0 || count($sectionData['lectures']) > 0) {
                if (isset($sectionData['id']) && $existingSections->has($sectionData['id'])) {
                    // Update existing section
                    $section = $existingSections->get($sectionData['id']);
                    $section->title = $sectionData['title'] ?? $section->title;
                    $section->save();
                    $updatedSectionIds[] = $section->id;
                } else {
                    // Create new section
                    $section = $course->sections()->create(['title' => $sectionData['title']]);
                }

                $existingLectures = $section->lectures->keyBy('id');
                $updatedLectureIds = [];

                foreach ($sectionData['lectures'] as $lectureData) {
                    if ($lectureData['title'] && $lectureData['type']) {
                        $path =null;

                        if (isset($lectureData['file'])) {
                            $file = $lectureData['file'];
                            $uniqueFileName = time() . '_' . $file->getClientOriginalName();
                            $file->move(public_path('lectures'), $uniqueFileName);
                            $path = "/lectures/" . $uniqueFileName;
                        }

                        if (isset($lectureData['id']) && $existingLectures->has($lectureData['id'])) {
                            // Update existing lecture
                            $lecture = $existingLectures->get($lectureData['id']);
                            $lecture->title = $lectureData['title'];
                            $lecture->type = $lectureData['type'];
                            if($path){
                                if ($lecture->path) {
                                    $prevPath = public_path($lecture->path);
                                    if (file_exists($prevPath)) {
                                        unlink($prevPath);
                                    }
                                }
                                $lecture->path = $path;
                            
                            }   
                            $lecture->save();
                            $updatedLectureIds[] = $lecture->id;
                        } else {
                            // Create new lecture
                            $lecture = $section->lectures()->create([
                                'title' => $lectureData['title'],
                                'type' => $lectureData['type'] ?? 'video',
                                'path' => $path,
                            ]);
                            $updatedLectureIds[] = $lecture->id;

                        }
                    }
                }

                // Delete lectures that are not in the updated data
                $section->lectures()->whereNotIn('id', $updatedLectureIds)->delete();
            }
        }

        // Delete sections that are not in the updated data
        $course->sections()->whereNotIn('id', $updatedSectionIds)->delete();


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
    public function rate(Request $request, $id){
        $validatedData = $request->validate([
            'comment' => 'string|max:255',
            'rating' => 'numeric|integer|max:5', 
            'id'=>'nullable',
        ]);
        $user = Auth::user();
        $course = Course::find($id);

        $rating = null;

        if($validatedData['id']){
            $rating = Rating::find($validatedData['id']);
        }else{
            $rating = new Rating();
            $rating->user_id = $user->id;
            $rating->course_id = $course->id;
        }
        $rating->comment = $validatedData['comment'];
        $rating->rating = $validatedData['rating'];
        $rating->save();

        return redirect()->back();
    }
}
