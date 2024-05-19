<?php

namespace App\Enums;

enum EducationLevel: string
{
    case BACHELOR = ['en' => 'Bachelor', 'ar' => 'بكالوريوس'];
    case MASTER = ['en' => 'Master', 'ar' => 'ماجستير'];
    case PHD = ['en' => 'PHD', 'ar' => 'دكتوراه'];
    case HIGH_SCHOOL_DIPLOMA = ['en' => 'High School Diploma', 'ar' => 'شهادة ثانوية'];
    case HIGH_INSTITUTE = ['en' =>'High Institute', 'ar' => 'معهد عالي'];

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
