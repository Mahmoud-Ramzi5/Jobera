<?php

namespace App\Enums;

enum RegJobTypes: string
{
    case FullTime = 'FullTime';
    case PartTime = 'PartTime';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'FullTime', 'ar' => 'دوام كامل'],
            ['en' => 'PartTime', 'ar' => 'دوام جزئي'],
        ];
    }
}
