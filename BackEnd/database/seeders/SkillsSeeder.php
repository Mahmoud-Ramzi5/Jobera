<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SkillsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('skills')->insert(array(
            array(
                'type' => 'IT',
                'name' => 'Data science',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'Machine Learning',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'Frontend Web',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'FrontEnd Mobile',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'Backend',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'Database',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'Network Administration',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'Cyber security',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'Cloud Computing',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'IT',
                'name' => 'Data Analysis',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'Adobe Photoshop, Illustrator',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'Video Editing and Production',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'Video Animation and Motion Graphics',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'Illustration and Digital Art',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'UI',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'UX',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'HR',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'Finance',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'sales',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'Digital Marketing',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'Content Writing and Copywriting',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'E-commerce',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'English',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'French',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'Arabic',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'Spanish',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'Dutch',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Electrical ENGINEERING',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Mechanical ENGINEERING',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Civil ENGINEERING',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Architecture ENGINEERING',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Petrol ENGINEERING',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'WORKER',
                'name' => 'plumber',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'WORKER',
                'name' => 'electrical',
                'created_at' => now(),
                'updated_at' => now(),
            ),
            array(
                'type' => 'WORKER',
                'name' => 'carpenter',
                'created_at' => now(),
                'updated_at' => now(),
            ),
        ));
    }
}
