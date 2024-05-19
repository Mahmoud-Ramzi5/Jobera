<?php

namespace App\Enums;

enum RegisterStep: string
{
    case SKILLS = ['en' => 'SKILLS', 'ar' => 'المهارات'];
    case EDUCATION = ['en' => 'EDUCATION', 'ar' => 'التعليم'];
    case CERTIFICATE = ['en' => 'CERTIFICATE', 'ar' => 'الشهادات'];
    case PORTFOLIO = ['en' => 'PORTFOLIO', 'ar' => 'معرض الأعمال'];
    case DONE = ['en' => 'DONE', 'ar' => 'منته'];

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
