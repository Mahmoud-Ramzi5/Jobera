<?php

namespace App\Policies;

use App\Models\FreelancingJob;
use App\Models\FreelancingJobCompetitor;
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

    public function ViewFreelancingJobCompetitors(User $user)
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
    public function AcceptUser(User $user, FreelancingJob $freelancingJob, FreelancingJobCompetitor $freelancingJobCompetitor)
    {
        if ($user->id == $freelancingJob->user_id) {
            $competitors = $freelancingJob->competitors()->pluck('id')->toArray();
            if (in_array($freelancingJobCompetitor->id, $competitors)) {
                return true;
            }
        }
        return false;
    }

    public function FinishedJob(User $user, FreelancingJob $freelancingJob)
    {
        if ($user->id == $freelancingJob->acceptedUser->id) {
            return true;
        }
        return false;
    }
}
