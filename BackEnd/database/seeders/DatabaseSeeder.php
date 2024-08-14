<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(CountriesSeeder::class);
        $this->call(SkillsSeeder::class);
        $this->call(IndividualSeeder::class);
        $this->call(CompaniesSeeder::class);
        $this->call(RegJobSeeder::class);
        $this->call(FreelancingJobSeeder::class);
        $this->call(MySeeder::class);
    }
}
