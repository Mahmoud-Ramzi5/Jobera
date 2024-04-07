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
                'name' =>'Data science'
            ),
            array(
                'type' => 'IT',
                'name' =>'Machine Learning'
            ),
            array(
                'type' => 'IT',
                'name' =>'Frontend Web'
            ),
            array(
                'type' => 'IT',
                'name' =>'FrontEnd Mobile'
            ),
            array(
                'type' => 'IT',
                'name' =>'Backend'
            ),
            array(
                'type' => 'IT',
                'name' =>'Database'
            ),
            array(
                'type' => 'IT',
                'name' =>'Network Administration'
            ),
            array(
                'type' => 'IT',
                'name' =>'Cyber security'
            ),
            array(
                'type' => 'IT',
                'name' =>'Cloud Computing'
            ),
            array(
                'type' => 'IT',
                'name' =>'Data Analysis'
            ),
            array(
                'type' => 'design',
                'name' =>'Adobe Photoshop, Illustrator'
            ),
            array(
                'type' => 'design',
                'name' =>'Video Editing and Production'
            ),
            array(
                'type' => 'design',
                'name' =>'Video Animation and Motion Graphics'
            ),
            array(
                'type' => 'design',
                'name' =>'UI'
            ),
            array(
                'type' => 'design',
                'name' =>'Illustration and Digital Art'
            ),
            array(
                'type' => 'design',
                'name' =>'UX'
            ),
            array(
                'type' => 'business',
                'name' =>'HR'
            ),
            array(
                'type' => 'business',
                'name' =>'Finance'
            ),
            array(
                'type' => 'business',
                'name' =>'sales'
            ),
            array(
                'type' => 'business',
                'name' =>'Digital Marketing'
            ),
            array(
                'type' => 'business',
                'name' =>'Content Writing and Copywriting'
            ),
            array(
                'type' => 'business',
                'name' =>'E-commerce'
            ),
            array(
                'type' => 'languages',
                'name' =>'Translation'
            ),
            array(
                'type' => 'languages',
                'name' =>'English'
            ),
            array(
                'type' => 'languages',
                'name' =>'French'
            ),
            array(
                'type' => 'languages',
                'name' =>'Arabic'
            ),
            array(
                'type' => 'languages',
                'name' =>'Spanish'
            ),
            array(
                'type' => 'languages',
                'name' =>'Dutch'
            ),
            array(
                'type' => 'engineering',
                'name' =>'Electrical engineering'
            ),
            array(
                'type' => 'engineering',
                'name' =>'Mechanical engineering'
            ),
            array(
                'type' => 'engineering',
                'name' =>'Civil engineering'
            ),
            array(
                'type' => 'engineering',
                'name' =>'Architecture engineering'
            ),
            array(
                'type' => 'engineering',
                'name' =>'Petrol engineering'
            ),
            array(
                'type' => 'worker',
                'name' =>'plumber'
            ),
            array(
                'type' => 'worker',
                'name' =>'electrical'
            ),
            array(
                'type' => 'worker',
                'name' =>'carpenter'
            ),
        ));
    }
}
