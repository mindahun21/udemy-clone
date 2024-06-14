<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Course;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Course::class;

    public function definition()
    {
        return[
            'title' => fake()->sentence(),
            'short_desc' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'price' => fake()->numberBetween(10, 100),
            'preview_path' => '/course_previews/wellcome.mp4', 
            'image_path' => "/course_images/".fake()->randomElement(['c1.png', 'c2.png', 'c3.png', 'c4.png']),
            'language' => 'English',
            'category_id' => fake()->numberBetween(1, 14),
            'user_id' => fake()->numberBetween(1, 3),
        ];
    }
}
