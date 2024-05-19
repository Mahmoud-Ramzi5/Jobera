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
                'name' => 'Data science'
            ),
            array(
                'type' => 'IT',
                'name' => 'Machine Learning'
            ),
            array(
                'type' => 'IT',
                'name' => 'Frontend Web'
            ),
            array(
                'type' => 'IT',
                'name' => 'FrontEnd Mobile'
            ),
            array(
                'type' => 'IT',
                'name' => 'Backend'
            ),
            array(
                'type' => 'IT',
                'name' => 'Database'
            ),
            array(
                'type' => 'IT',
                'name' => 'Network Administration'
            ),
            array(
                'type' => 'IT',
                'name' => 'Cyber security'
            ),
            array(
                'type' => 'IT',
                'name' => 'Cloud Computing'
            ),
            array(
                'type' => 'IT',
                'name' => 'Data Analysis'
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'Adobe Photoshop, Illustrator'
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'Video Editing and Production'
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'Video Animation and Motion Graphics'
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'UI'
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'Illustration and Digital Art'
            ),
            array(
                'type' => 'DESIGN',
                'name' => 'UX'
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'HR'
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'Finance'
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'sales'
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'Digital Marketing'
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'Content Writing and Copywriting'
            ),
            array(
                'type' => 'BUSINESS',
                'name' => 'E-commerce'
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'Translation'
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'English'
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'French'
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'Arabic'
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'Spanish'
            ),
            array(
                'type' => 'LANGUAGES',
                'name' => 'Dutch'
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Electrical ENGINEERING'
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Mechanical ENGINEERING'
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Civil ENGINEERING'
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Architecture ENGINEERING'
            ),
            array(
                'type' => 'ENGINEERING',
                'name' => 'Petrol ENGINEERING'
            ),
            array(
                'type' => 'WORKER',
                'name' => 'plumber'
            ),
            array(
                'type' => 'WORKER',
                'name' => 'electrical'
            ),
            array(
                'type' => 'WORKER',
                'name' => 'carpenter'
            ),
        ));
    }
}
