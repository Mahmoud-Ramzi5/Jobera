<?php

namespace App\Enums;

enum SkillTypes: string
{
    case IT = ['en' => 'IT', 'ar' => 'هندسة معلوماتية'];
    case DESIGN = ['en' => 'Design', 'ar' => 'تصميم'];
    case BUSINESS = ['en' => 'Business', 'ar' => 'أعمال'];
    case LANGUAGES = ['en' => 'Languages', 'ar' => 'لغات'];
    case ENGINEERING = ['en' =>'Engineering', 'ar' => 'هندسة'];
    case WORKER = ['en' =>'Worker', 'ar' => 'عامل'];

}
