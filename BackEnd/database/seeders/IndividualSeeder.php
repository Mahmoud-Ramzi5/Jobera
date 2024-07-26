<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\Education;
use App\Models\Individual;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class IndividualSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills=Skill::all();
        Individual::factory()->count(15)->create()->each(function ($individual) use ($skills) {
            $individual->skills()->attach(
                $skills->random(rand(1, 5))->pluck('id')->toArray()
            );
            Education::factory()->create([
                'individual_id' => $individual->id,
            ]);
        });
    }
}
