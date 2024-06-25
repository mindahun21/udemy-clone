<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Models\Course;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $courses = Course::with([
        'creator',
        'students',
        'category',
        'requirements',
        'sections',
        'rating',
        'courseFor'
    ])
    ->withAvg('rating', 'rating')
    ->withCount('rating')
    ->orderByDesc('rating_avg_rating')
    ->take(20)
    ->get();

    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'courses' => $courses,
    ]);
});

Route::get('/try',function(){
    $query='development';
    $courses = Course::query()
                            ->leftJoin('categories','courses.category_id', '=', 'categories.id')
                            ->leftJoin('users', 'courses.user_id', '=', 'users.id')
                            ->where('courses.title', 'like', '%'.$query .'%')
                            ->orWhere('categories.name', 'like', '%'.$query .'%')
                            ->orWhere('users.name', 'like', '%'.$query .'%')
                            ->with([
                                'creator',
                                'students',
                                'category',
                                'requirements',
                                'sections',
                                'rating',
                                'courseFor'
                            ])
                            ->select('courses.*')
                            ->paginate(10)->onEachSide(1);
    return $courses; 
});

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/search',[SearchController::class,'search'])->name('search');
Route::get('/course/{id}',[CourseController::class, 'show'])->name('course.show');
Route::post('/course/addtocart/{id}',[CourseController::class, 'addtocart'])->name('course.addtocart');
Route::post('/course/enroll/{id}',[CourseController::class, 'enroll'])->name('course.enroll');
Route::post('/course/enroll-all',[CourseController::class, 'enrollall'])->name('course.enroll-all');
Route::get('/course/learn/{id}',[CourseController::class, 'learn'])->name('course.learn');
Route::post('/course/{id}/rate',[CourseController::class, 'rate'])->name('course.rate');


Route::get('/instructor', [InstructorController::class, 'index'])->name('instructor');
Route::get('/instructor/course/create',function(){
    return Inertia::render('CreateCourse');
})->name('course.create');
Route::post('/instructor/course/create',[CourseController::class, 'create'])->name('course.create');

Route::post('/instructor/course/{id}/update',[CourseController::class, 'update'])->name('course.update');
Route::get('/instructor/course/{id}/update',[CourseController::class, 'edit'])->name('course.edit');

Route::get('my-learnings/',function(){
    $user = Auth::user();
    if(!$user){
        return to_route('login');
    }
    return Inertia::render('MyLearning');
})->name('my-learning');


Route::get('/cart', [CartController::class, 'index'])->name('cart');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
