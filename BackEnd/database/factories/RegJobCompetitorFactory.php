<?php

namespace Database\Factories;

use App\Models\Individual;
use App\Models\RegJob;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RegJobCompetitor>
 */
class RegJobCompetitorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $regJob=RegJob::inRandomOrder()->first();

        return [
            'individual_id'=>Individual::inRandomOrder()->first()->id,
            'job_id'=>$regJob->id,
            'description'=>$this->faker->sentence
        ];
    }
}
