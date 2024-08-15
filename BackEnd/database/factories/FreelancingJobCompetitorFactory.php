<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\FreelancingJob;
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
        $freelancingJob = FreelancingJob::inRandomOrder()->first();

        // Generate user id except job's user id or admin id
        do {
            $user_id = User::inRandomOrder()->first()->id;
        } while ($user_id == $freelancingJob->user->id || $user_id == 1);

        return [
            'user_id' => $user_id,
            'job_id' => $freelancingJob->id,
            'offer' => $this->faker->numberBetween($freelancingJob->min_salary, $freelancingJob->max_salary),
            'description' => $this->faker->sentence
        ];
    }
}
