<?php

namespace App\Policies;

use App\Models\RegJobCompetitor;
use App\Models\User;
use App\Models\RegJob;
use App\Models\Company;
use App\Models\Individual;

class RegJobPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function PostRegJob(User $user)
    {
        $company = Company::where('user_id', $user->id)->first();
        if ($company == null) {
            return false;
        }
        if($user->email_verified_at==null){
            return false;
        }
        return true;
    }

    public function ViewRegJobs(User $user)
    {
        return true;
    }

    public function ShowRegJob(User $user, RegJob $regJob)
    {
        return true;
    }

    public function ViewRegJobCompetitors(User $user)
    {
        return true;
    }

    public function ApplyRegJob(User $user)
    {
        $individual = Individual::where('user_id', $user->id)->first();
        if ($individual == null) {
            return false;
        }
        if($user->email_verified_at==null){
            return false;
        }
        return true;
    }

    public function DeleteRegJob(User $user, RegJob $regJob)
    {
        $company = Company::where('user_id', $user->id)->first();
        if ($company == null) {
            return false;
        }
        if ($company->id == $regJob->company_id) {
            return true;
        }
        return false;
    }
    public function AcceptIndividual(User $user, RegJob $regJob, RegJobCompetitor $regJobCompetitor)
    {
        $company = Company::where('user_id', $user->id)->first();
        if ($company == null) {
            return false;
        }
        if ($company->id == $regJob->company_id) {
            $competitors = $regJob->competitors()->pluck('id')->toArray();
            if (in_array($regJobCompetitor->id, $competitors))
                return true;
        }
        return false;
    }
}
