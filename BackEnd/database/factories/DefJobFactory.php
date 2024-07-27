<?php

namespace Database\Factories;

use App\Models\Skill;
use App\Models\DefJob;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DefJob>
 */
class DefJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle,
            'description' => $this->faker->paragraph,
            'is_done' => false,
            'state_id' => random_int(1, 4000)
        ];
    }

    /**
     * Define the model's state with skills.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withSkills(): Factory
    {
        return $this->afterCreating(function (DefJob $defJob) {
            $skills = Skill::inRandomOrder()->take(rand(1, 5))->pluck('id');
            $defJob->skills()->sync($skills);
        });
    }
}
