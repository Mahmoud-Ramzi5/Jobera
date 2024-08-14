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
            ->count(10)
            ->withCompetitors()
            ->create();

        RegJob::factory()
            ->count(10)
            ->withCompetitors()
            ->withRating()
            ->create()
            ->each(function ($regJob) {
                $regJob->defJob->is_done = true;
                $regJob->defJob->save();
            });

        RegJob::factory()
            ->count(10)
            ->withCompetitors()
            ->create()
            ->each(function ($regJob) {
                $regJob->accepted_individual = null;
                $regJob->save();
            });
    }
}
