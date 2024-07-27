<?php

namespace Database\Seeders;

use App\Models\FreelancingJob;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FreelancingJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FreelancingJob::factory()
        ->count(20)
        ->withCompetitors()
        ->withSkills() 
        ->create();
    }
}
