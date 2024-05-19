<?php

namespace App\Enums;

enum IndividualGender: string
{
    case MALE = ['en' => 'Male', 'ar' => 'ذكر'];
    case FEMALE = ['en' => 'Female', 'ar' => 'انثى'];

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
