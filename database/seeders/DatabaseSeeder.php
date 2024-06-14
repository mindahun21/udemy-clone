<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\CourseFor;
use App\Models\Lecture;
use App\Models\Objective;
use App\Models\Rating;
use App\Models\Requirement;
use App\Models\Section;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
        'name' => 'Test User 1',
        'email' => 'test1@example.com',
        'password' => bcrypt('123.321A'),  
        'email_verified_at' => now()
        ]);

        User::factory()->create([
        'name' => 'Test User 2',
        'email' => 'test2@example.com',
        'password' => bcrypt('123.321B'),
        'email_verified_at' => now()  
        ]);

        User::factory()->create([
        'name' => 'Test User 3', 
        'email' => 'test3@example.com',
        'password' => bcrypt('123.321C'),
        'email_verified_at' => now()
        ]);

        $categories = [
            "Development",
            "Web Development",
            "Mobile Development",
            "Programming",
            "Data Science",
            "Design",
            "Business",
            "Marketing",
            "Finance",
            "Photography",
            "Music",
            "Personal Development",
            "Health & Fitness",
            "Lifestyle",
            "Languages",
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }

        // Create 20 courses
        Course::factory()->count(20)->create()->each(function ($course) {
            // Create 5 sections for each course
            Section::factory()->count(5)->create(['course_id' => $course->id])->each(function ($section) {
                // Create 5 lectures for each section
                Lecture::factory()->count(5)->create(['section_id' => $section->id]);
            });

            // Create 5 requirements for each course
            Requirement::factory()->count(5)->create(['course_id' => $course->id]);

            // Create 5 ratings for each course
            Rating::factory()->count(5)->create(['course_id' => $course->id]);

            // Create 5 course_for entries for each course
            CourseFor::factory()->count(5)->create(['course_id' => $course->id]);

            Objective::factory()->count(5)->create(['course_id' => $course->id]);
        });
    }
}
