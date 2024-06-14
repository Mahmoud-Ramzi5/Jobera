<?php

namespace App\Enums;

enum RegisterStep: string
{
    case SKILLS = 'SKILLS';
    case EDUCATION = 'EDUCATION';
    case CERTIFICATES = 'CERTIFICATES';
    case PORTFOLIO = 'PORTFOLIO';
    case DONE = 'DONE';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'SKILLS', 'ar' => 'المهارات'],
            ['en' => 'EDUCATION', 'ar' => 'التعليم'],
            ['en' => 'CERTIFICATE', 'ar' => 'الشهادات'],
            ['en' => 'PORTFOLIO', 'ar' => 'معرض الأعمال'],
            ['en' => 'DONE', 'ar' => 'منته'],
        ];
    }
}
