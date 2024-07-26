<?php

namespace Database\Factories;

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
        'is_done'=>true,
        'state_id' => random_int(1,4000)
        ];
    }
}
