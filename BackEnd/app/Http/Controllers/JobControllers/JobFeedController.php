<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\FreelancingJob;
use App\Models\RegJob;

class JobFeedController extends Controller
{
    public function MostPayedRegJobsWeekly()
    {
        $data = [];
        $regjobs = RegJob::whereNotNull('accepted_individual')
            ->whereBetween('created_at', [now()->subWeek(), now()])
            ->get();
        $regjobs = $regjobs->sortByDesc('salary');

        // Assuming you want to retrieve the top 5 highest-paying regular jobs
        $topJobs = $regjobs->take(5);

        foreach ($topJobs as $job) {
            $data[] = [
                'job_title' => $job->title,
                'salary' => $job->salary,
            ];
        }

        return $data;
    }

    public function MostPayedFreelancingJobsWeekly()
    {
        $data = [];
        $freelancingjobs = FreelancingJob::whereNotNull('accepted_user')
            ->whereBetween('created_at', [now()->subWeek(), now()])
            ->get();

        foreach ($freelancingjobs as $freelancingjob) {
            foreach ($freelancingjob->competitors() as $competitor) {
                if ($competitor->user->id == $freelancingjob->accepted_user) {
                    $freelancingjob->salary = $competitor->salary;
                    break;
                }
            }
        }
        $freelancingjobs = $freelancingjobs->sortByDesc('salary');

        // Assuming you want to retrieve the top 5 highest-paying freelancing jobs
        $topJobs = $freelancingjobs->take(5);

        foreach ($topJobs as $job) {
            $data[] = [
                'job_title' => $job->title,
                'salary' => $job->salary,
            ];
        }

        return $data;
    }

    public function MostNeededSkillsWeekly()
    {
        $freelancingjobs = FreelancingJob::whereNotNull('accepted_user')
            ->whereBetween('created_at', [now()->subWeek(), now()])
            ->get();

        $Regjobs = RegJob::whereNotNull('accepted_individual')
            ->whereBetween('created_at', [now()->subWeek(), now()])
            ->get();
        $skills = [];

        foreach ($Regjobs as $Regjob) {
            foreach ($Regjob->skills() as $skill) {
                $skills[] = $skill;
            }
        }

        foreach ($freelancingjobs as $freelancingjob) {
            foreach ($freelancingjob->skills() as $skill) {
                $skills[] = $skill;
            }
        }

        $skillCounts = array_count_values($skills);
        arsort($skillCounts);
        $mostNeededSkills = array_keys($skillCounts);

        return $mostNeededSkills;
    }

    public function MostPostingCompaniesMonthly()
    {
        $regJobs = RegJob::whereNotNull('accepted_individual')
            ->whereBetween('created_at', [now()->subWeek(), now()])
            ->get();;
        $companies = [];
        foreach ($regJobs as $regJob) {
            $companies[] = $regJob->company();
        }
        $companyCounts = array_count_values($companies);
        arsort($companyCounts);
        $MostPostingCompanies = array_keys($companyCounts);
        return $MostPostingCompanies;
    }

    public function WebsiteData()
    {
        /*
        return response()->json([
            "total_freelancingJob_posts"=>,
            "total_fullTimeJob_posts"=>,
            "total_partTimeJob_posts"=>,
            "total_accepted_fullTimeJob_lastWeek"=>,
            "total_accepted_partTimeJob_lastWeek"=>,
            "total_accepted_freelancingJob_lastWeek"=>,
            "total_Exhibiting_companies"=>,
        ]);
        */
    }
}
