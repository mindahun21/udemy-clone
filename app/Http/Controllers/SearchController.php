<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request){
        $query = $request->query('q');
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
        return Inertia::render('SearchResult', [
            'courses' => $courses,
            'query' => $query,
        ]);
    }
}
