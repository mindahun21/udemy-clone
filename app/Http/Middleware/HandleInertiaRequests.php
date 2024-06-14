<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
    
        if ($user) {
            $user->load([
                'courses' => function ($query) {
                    $query->with([
                        'creator',
                        'students',
                        'category',
                        'requirements',
                        'objectives',
                        'sections',
                        'rating',
                        'courseFor'
                    ]);
                }, 
                'cartCourses'=> function ($query) {
                    $query->with([
                        'creator',
                        'students',
                        'category',
                        'objectives',
                        'requirements',
                        'sections',
                        'rating',
                        'courseFor'
                    ]);
                },
                'enrolledCourses'=> function ($query) {
                    $query->with([
                        'creator',
                        'students',
                        'category',
                        'objectives',
                        'requirements',
                        'sections',
                        'rating',
                        'courseFor'
                    ]);
                }
            ]);
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
