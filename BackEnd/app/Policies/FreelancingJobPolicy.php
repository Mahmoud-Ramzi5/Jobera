<?php

namespace App\Policies;

use App\Models\FreelancingJob;
use App\Models\FreelancingJobCompetetor;
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

    public function DeleteFreelancingJob(User $user, FreelancingJob $freelancingJob)
    {
        if ($user->id == $freelancingJob->user_id) {
            return true;
        }
        return false;
    }
    public function AcceptUser(User $user, FreelancingJob $freelancingJob, FreelancingJobCompetetor $freelancingJobCompetetor)
    {
        if ($user->id == $freelancingJob->user_id) {
            $competetors = $freelancingJob->competetors()->pluck('id')->toArray();
            if (in_array($freelancingJobCompetetor->id, $competetors)) {
                return true;
            }
        }
        return false;
    }
}
