<?php

namespace App\Enums;

enum SkillTypes: string
{
    case IT = 'IT';
    case DESIGN = 'DESIGN';
    case BUSINESS = 'BUSINESS';
    case LANGUAGES = 'LANGUAGES';
    case ENGINEERING = 'ENGINEERING';
    case WORKER = 'WORKER';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'IT', 'ar' => 'هندسة معلوماتية'],
            ['en' => 'Design', 'ar' => 'تصميم'],
            ['en' => 'Business', 'ar' => 'أعمال'],
            ['en' => 'Languages', 'ar' => 'لغات'],
            ['en' => 'Engineering', 'ar' => 'هندسة'],
            ['en' => 'Worker', 'ar' => 'عامل'],
        ];
    }
}
