<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lecture>
 */
class LectureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'path'=>'lectures/'.fake()->randomElement(['lecture1.mp4','lecture2.mp4','lecture3.mp4']),
            'type' => 'video',
        ];
    }
}
