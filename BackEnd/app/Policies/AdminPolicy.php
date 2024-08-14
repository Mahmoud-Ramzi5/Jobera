<?php

namespace App\Policies;

use App\Models\User;

class AdminPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function Policy(User $user)
    {
        if ($user->id == 1) {
            return true;
        }
        return false;
    }
}
