<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\DefJob;
use App\Models\FreelancingJob;
use App\Models\FreelancingJobCompetitor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<FreelancingJob>
 */
class FreelancingJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $minSalary = $this->faker->numberBetween(30, 1000);
        $maxSalary = $this->faker->numberBetween($minSalary + 50, 1500);

        // Generate a future deadline date
        $deadline = $this->faker->dateTimeBetween('now', '+6 months')->format('Y-m-d');

        // Generate user id except first id
        $user_id1 = User::inRandomOrder()->first()->id;
        while ($user_id1 == 1) {
            $user_id1 = User::inRandomOrder()->first()->id;
        }

        // Generate user id except first id
        $user_id2 = User::inRandomOrder()->first()->id;
        while ($user_id2 == 1) {
            $user_id2 = User::inRandomOrder()->first()->id;
        }

        return [
            'deadline' => $deadline,
            'min_salary' => $minSalary,
            'max_salary' => $maxSalary,
            'user_id' => $user_id1,
            'defJob_id' => DefJob::factory()->withSkills(),
            'accepted_user' => $user_id2,
        ];
    }

    public function withCompetitors()
    {
        return $this->afterCreating(function (FreelancingJob $freelancingJob) {
            // Add two random competitors
            FreelancingJobCompetitor::factory()->count(2)->create([
                'job_id' => $freelancingJob->id,
            ]);

            // Add one competitor with the same ID as the accepted user
            FreelancingJobCompetitor::factory()->create([
                'job_id' => $freelancingJob->id,
                'user_id' => $freelancingJob->accepted_user,
            ]);
        });
    }
}
