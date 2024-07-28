<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\DefJob;
use App\Models\FreelancingJob;
use App\Models\FreelancingJobCompetitor;
use App\Models\Individual;
use App\Models\RegJob;
use App\Models\Skill;

class JobFeedController extends Controller
{
    public function MostPayedRegJobs()
    {
        $data = [];
        $regjobs = RegJob::whereNotNull('accepted_individual')
            ->get();
        $regjobs = $regjobs->sortByDesc('salary');

        // Assuming you want to retrieve the top 5 highest-paying regular jobs
        $topJobs = $regjobs->take(5);

        foreach ($topJobs as $job) {
            $defJob = DefJob::where('id', $job->defJob_id)->first();
            $data[] = [
                'id' => $job->defJob_id,
                'title' => $defJob->title,
                'salary' => $job->salary,
            ];
        }

        return $data;
    }

    public function MostPayedFreelancingJobs()
    {
        $data = [];
        $freelancingjobs = FreelancingJob::whereNotNull('accepted_user')
            ->get();

        foreach ($freelancingjobs as $freelancingjob) {
            foreach ($freelancingjob->competitors() as $competitor) {
                if ($competitor->user->id == $freelancingjob->accepted_user) {
                    $freelancingjob->salary = $competitor->offer;
                    break;
                }
            }
        }
        $freelancingjobs = $freelancingjobs->sortByDesc('salary');

        // Assuming you want to retrieve the top 5 highest-paying freelancing jobs
        $topJobs = $freelancingjobs->take(5);

        foreach ($topJobs as $job) {
            $defJob = DefJob::where('id', $job->defJob_id)->first();
            $accepted_competitor = FreelancingJobCompetitor::where('user_id', $job->accepted_user)->first();
            $data[] = [
                'id' => $job->defJob_id,
                'title' => $defJob->title,
                'salary' => $accepted_competitor->offer,
            ];
        }

        return $data;
    }

    public function MostNeededSkills()
    {
        $freelancingJobs = FreelancingJob::whereNotNull('accepted_user')->get();
        $regJobs = RegJob::whereNotNull('accepted_individual')->get();
        $skills = [];

        foreach ($regJobs as $regJob) {
            $defJob=DefJob::where('id',$regJob->defJob_id)->first();
            foreach ($defJob->skills as $skill) {
                $skills[] = $skill->name; // Collecting skill names
            }
        }

        foreach ($freelancingJobs as $freelancingJob) {
            $defJob=DefJob::where('id',$freelancingJob->defJob_id)->first();
            foreach ($defJob->skills as $skill) {
                $skills[] = $skill->name; // Collecting skill names
            }
        }

        $skillCounts = array_count_values($skills);
        arsort($skillCounts);

        // Preparing the result
        $mostNeededSkills = [];
        foreach ($skillCounts as $skillName => $count) {
            $skill = Skill::where('name', $skillName)->first();
            $mostNeededSkills[] = ['title' => $skillName, 'count' => $count, 'skill_id' => $skill->id];
        }

        $topMostNeededSkills = array_slice($mostNeededSkills, 0, 5);

        return  $topMostNeededSkills;

    }

    public function MostPostingCompanies()
    {
        $regJobs = RegJob::whereNotNull('accepted_individual')
            ->get();
        $companies = [];
        foreach ($regJobs as $regJob) {
            $companies[] = $regJob->company->name;
        }
        $companyCounts = array_count_values($companies);
        arsort($companyCounts);
        foreach ($companyCounts as $companyName => $count) {
            $company = Company::where('name', $companyName)->first();
            $MostPostingCompanies[] = ['title' => $companyName, 'count' => $count, 'company_id' => $company->user_id];
        }
        $topMostPostingCompanies = array_slice($MostPostingCompanies, 0, 5);

        return  $topMostPostingCompanies;
    }

    public function Stats()
    {
        $doneJobs = 0;
        $runningJobsFreelancing = 0;
        $runningJobsFullTime = 0;
        $runningJobsPartTime = 0;
        $jobs = DefJob::all();
        foreach ($jobs as $job) {
            $regJob = RegJob::where('defJob_id', $job->id)->first();
            $freelancingJob = FreelancingJob::where('defJob_id', $job->id)->first();
            if (($regJob!=null && $regJob->acceptedIndividual()!=null) ||($freelancingJob!=null && $freelancingJob->acceptedUser()!=null)) {
                $doneJobs++;
                continue;
            }
            if ($regJob != null) {
                if ($regJob->type == 'FullTime') {
                    $runningJobsFullTime++;
                } else {
                    $runningJobsPartTime++;
                }

                continue;
            }
            $runningJobsFreelancing++;
        }
        $companyRegistered = Company::count();
        $individualRegistered = Individual::count();

        return response()->json([
            "total_done_jobs" => $doneJobs,
            "total_runnning_freelancingJob_posts" => $runningJobsFreelancing,
            "total_runnning_fullTimeJob_posts" => $runningJobsFullTime,
            "total_runnning_partTimeJob_posts" => $runningJobsPartTime,
            "total_exhibiting_companies" => $companyRegistered,
            "total_registered_individual" => $individualRegistered,
        ]);
    }
    public function Tops(){
        return response()->json([
            "MostPayedRegJobs"=>$this->MostPayedRegJobs(),
            "MostPostingCompanies"=>$this->MostPostingCompanies(),
            "MostPayedFreelancingJobs"=>$this->MostPayedFreelancingJobs(),
            "MostNeededSkills"=>$this->MostNeededSkills()
        ]);
    }
}
