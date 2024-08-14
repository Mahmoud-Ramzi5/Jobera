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
        $birthDate = $this->faker->dateTimeBetween('-75 years', '-15 years')->format('Y-m-d');
        return [
            'full_name' => $this->faker->firstNameMale(),
            'birth_date' => $birthDate,
            'gender' => 'MALE',
            'type' => 'individual',
            'user_id' => User::factory()
        ];
    }
}
