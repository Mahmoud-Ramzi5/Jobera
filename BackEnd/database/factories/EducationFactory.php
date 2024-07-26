<?php

namespace Database\Factories;

use App\Enums\EducationLevel;
use App\Models\Individual;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Education>
 */
class EducationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Custom list of universities
        $universities = [
            'Harvard University',
            'Damascus University',
            'Arabic International University',
            'International University of Sceince and Technology',
            'AlBaath University',
            'Tishreen University',
            'Princeton University',
            'Yale University',
            'Columbia University',
            'California Institute of Technology'
        ];
        $startDate=$this->faker->date($format = 'Y-m-d', $max = 'now');
        $endDate = $this->faker->dateTimeBetween($startDate, '+8 years')->format('Y-m-d');
        $individual = Individual::latest()->first();
        return [
            "level"=>$this->faker->randomElement(EducationLevel::names()),
            "field"=>$this->faker->bs,
            "school"=>$this->faker->randomElement($universities),
            "start_date"=>$startDate,
            "end_date"=>$endDate,
            "individual_id"=>$individual->id
        ];
    }
}
