<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Individual>
 */
class IndividualFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => $this->faker->name,
            'birth_date' => $this->faker->date('Y-m-d'),
            'gender' => $this->faker->randomElement(['MALE', 'FEMALE']),
            'type' => 'individual',
            'user_id' => User::factory()
        ];
    }
}
