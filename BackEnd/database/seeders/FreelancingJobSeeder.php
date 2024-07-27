<?php

namespace Database\Seeders;

use App\Models\FreelancingJob;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
