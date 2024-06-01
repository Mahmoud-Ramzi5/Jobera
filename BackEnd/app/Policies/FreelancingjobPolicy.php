<?php

namespace App\Policies;

use App\Models\FreelancingJob;
use App\Models\User;

class FreelancingJobPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function PostFreelancingJob(User $user)
    {
        return true;
    }

    public function ViewFreelancingJobs(User $user)
    {
        return true;
    }

    public function ShowFreelancingJob(User $user, FreelancingJob $FreelancingJob)
    {
        return true;
    }

    public function ViewFreelancingJobCompetetors(User $user)
    {
        return true;
    }

    public function ApplyFreelancingJob(User $user)
    {
        return true;
    }

    public function DeleteFreelancingJob(User $user, FreelancingJob $FreelancingJob)
    {
        if ($user->id == $FreelancingJob->user_id) {
            return true;
        }
        return false;
    }
}
