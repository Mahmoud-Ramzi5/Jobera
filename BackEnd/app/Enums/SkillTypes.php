<?php

namespace App\Enums;

enum SkillTypes: string
{
    case IT = 'IT'|| 'هندسة معلوماتية';
    case DESIGN = 'Design' || "";
    case BUSINESS = 'Business';
    case LANGUAGES = 'Languages';
    case ENGINEERING = 'Engineering';
    case WORKER = 'Worker';

}
