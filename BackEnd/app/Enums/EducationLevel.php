<?php

namespace App\Enums;

enum EducationLevel: string
{
    case BACHELOR = 'BACHELOR';
    case MASTER = 'MASTER';
    case PHD = 'PHD';
    case HIGH_SCHOOL_DIPLOMA = 'HIGH_SCHOOL_DIPLOMA';
    case HIGH_INSTITUTE = 'HIGH_INSTITUTE';

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return [
            ['en' => 'Bachelor', 'ar' => 'بكالوريوس'],
            ['en' => 'Master', 'ar' => 'ماجستير'],
            ['en' => 'PHD', 'ar' => 'دكتوراه'],
            ['en' => 'High School Diploma', 'ar' => 'شهادة ثانوية'],
            ['en' => 'High Institute', 'ar' => 'معهد عالي'],
        ];
    }
}
