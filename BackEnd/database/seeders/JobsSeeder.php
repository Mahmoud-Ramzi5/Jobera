<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($id = 1; $id <= 30; $id += 1) {
            DB::table('def_jobs')->insert(array(
                'title' => 'title' . $id,
                'description' => 'description' . $id,
                'state_id' => 3464,
                'photo' => null,
                'is_done' => false
            ));
        }

        for ($id = 1; $id <= 30; $id += 3) {
            DB::table('reg_jobs')->insert(array(
                'salary' => 2000.0,
                'type' => 'FullTime',
                'company_id' => 1,
                'defJob_id' => $id,
                'accepted_individual' => null
            ));
        }

        for ($id = 2; $id <= 30; $id += 3) {
            DB::table('reg_jobs')->insert(array(
                'salary' => 2000.0,
                'type' => 'PartTime',
                'company_id' => 1,
                'defJob_id' => $id,
                'accepted_individual' => null
            ));
        }

        for ($id = 3; $id <= 30; $id += 3) {
            DB::table('freelancing_jobs')->insert(array(
                'min_salary' => 1000.0,
                'max_salary' => 3000.0,
                'deadline' => '2024-12-30',
                'avg_salary' => 0.0,
                'user_id' => 1,
                'defJob_id' => $id,
                'accepted_user' => null
            ));
        }
    }
}
