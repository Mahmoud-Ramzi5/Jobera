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
                'type' => 'Design',
                'name' =>'Adobe Photoshop, Illustrator'
            ),
            array(
                'type' => 'Design',
                'name' =>'Video Editing and Production'
            ),
            array(
                'type' => 'Design',
                'name' =>'Video Animation and Motion Graphics'
            ),
            array(
                'type' => 'Design',
                'name' =>'UI'
            ),
            array(
                'type' => 'Design',
                'name' =>'Illustration and Digital Art'
            ),
            array(
                'type' => 'Design',
                'name' =>'UX'
            ),
            array(
                'type' => 'Business',
                'name' =>'HR'
            ),
            array(
                'type' => 'Business',
                'name' =>'Finance'
            ),
            array(
                'type' => 'Business',
                'name' =>'sales'
            ),
            array(
                'type' => 'Business',
                'name' =>'Digital Marketing'
            ),
            array(
                'type' => 'Business',
                'name' =>'Content Writing and Copywriting'
            ),
            array(
                'type' => 'Business',
                'name' =>'E-commerce'
            ),
            array(
                'type' => 'Languages',
                'name' =>'Translation'
            ),
            array(
                'type' => 'Languages',
                'name' =>'English'
            ),
            array(
                'type' => 'Languages',
                'name' =>'French'
            ),
            array(
                'type' => 'Languages',
                'name' =>'Arabic'
            ),
            array(
                'type' => 'Languages',
                'name' =>'Spanish'
            ),
            array(
                'type' => 'Languages',
                'name' =>'Dutch'
            ),
            array(
                'type' => 'Engineering',
                'name' =>'Electrical engineering'
            ),
            array(
                'type' => 'Engineering',
                'name' =>'Mechanical engineering'
            ),
            array(
                'type' => 'Engineering',
                'name' =>'Civil engineering'
            ),
            array(
                'type' => 'Engineering',
                'name' =>'Architecture engineering'
            ),
            array(
                'type' => 'Engineering',
                'name' =>'Petrol engineering'
            ),
            array(
                'type' => 'Worker',
                'name' =>'plumber'
            ),
            array(
                'type' => 'Worker',
                'name' =>'electrical'
            ),
            array(
                'type' => 'Worker',
                'name' =>'carpenter'
            ),
        ));
    }
}
