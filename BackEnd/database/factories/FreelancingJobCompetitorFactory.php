<?php

namespace Database\Factories;

use App\Models\FreelancingJob;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FreelancingJobCompetitor>
 */
class FreelancingJobCompetitorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $freelancingJob=FreelancingJob::inRandomOrder()->first();

        return [
            'user_id'=>User::inRandomOrder()->first()->id,
            'job_id'=>$freelancingJob->id,
            'salary'=>$this->faker->numberBetween($freelancingJob->min_salary, $freelancingJob->max_salary),
            'description'=>$this->faker->sentence
        ];
    }
}
