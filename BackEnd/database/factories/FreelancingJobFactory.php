<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Skill;
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

        return [
           'min_salary' => $minSalary, 
            'max_salary' => $maxSalary, 
            'deadline' => $deadline, 
            'user_id' => User::inRandomOrder()->first()->id,
            'defJob_id' => DefJob::factory(),
            'accepted_user' => User::inRandomOrder()->first()->id,
       
        ];
    }
     /**
     * Define the model's state with skills.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withSkills(): Factory
    {
        return $this->afterCreating(function (FreelancingJob $freelancingJob) {
            $skills = Skill::inRandomOrder()->take(rand(1, 5))->pluck('id');
            $freelancingJob->skills()->sync($skills);
        });
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
