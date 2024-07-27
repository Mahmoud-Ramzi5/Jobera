<?php

namespace Database\Factories;

use App\Models\Skill;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\Company;
use App\Models\Individual;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RegJob>
 */
class RegJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Define some example data
        return [
            'salary' => $this->faker->numberBetween(100, 3000),
            'type' => $this->faker->randomElement(['PartTime', 'FullTime']),
            'company_id' => Company::inRandomOrder()->first()->id,
            'defJob_id' => DefJob::factory(),
            'accepted_individual' => Individual::inRandomOrder()->first()->id,
        ];
    }

    /**
     * Define the model's state with skills.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withSkills(): Factory
    {
        return $this->afterCreating(function (RegJob $regJob) {
            $skills = Skill::inRandomOrder()->take(rand(1, 5))->pluck('id');
            $regJob->skills()->sync($skills);
        });
    }
}
