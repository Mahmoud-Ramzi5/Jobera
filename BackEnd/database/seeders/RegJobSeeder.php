<?php

namespace Database\Seeders;

use App\Models\RegJob;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RegJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RegJob::factory()
            ->count(20)
            ->withCompetitors()
            ->withSkills()
            ->create();
    }
}
