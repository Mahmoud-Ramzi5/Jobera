<?php

namespace App\Policies;

use App\Models\User;

class SkillPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
    public function AddSkill(User $user)
    {
        if($user->id==1)
            return true;
        return false;
    }
}
