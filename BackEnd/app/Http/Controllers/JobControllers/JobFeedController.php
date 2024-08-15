<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\Company;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\FreelancingJob;
use App\Models\Skill;

class JobFeedController extends Controller
{
    public function MostPayedRegJobs()
    {
        // Get the top 5 highest-paying regular jobs
        $topJobs = [];
        $regJobs = RegJob::select('salary', 'defJob_id')->with('defJob:id,title')
            ->whereNotNull('accepted_individual')->orderByDesc('salary')->get()->take(5);

        foreach ($regJobs as $job) {
            array_push($topJobs, [
                'id' => $job->defJob_id,
                'title' => $job->defJob->title,
                'salary' => $job->salary,
            ]);
        }

        // Return
        return $topJobs;
    }

    public function MostPayedFreelancingJobs()
    {
        // Get highest-paying freelancing jobs
        $data = [];
        $topJobs = [];
        $freelancingJobs = FreelancingJob::whereNotNull('accepted_user')->get();

        foreach ($freelancingJobs as $freelancingJob) {
            foreach ($freelancingJob->competitors as $competitor) {
                if ($competitor->user_id == $freelancingJob->accepted_user) {
                    array_push($data, [
                        'id' => $freelancingJob->defJob_id,
                        'title' => $freelancingJob->defJob->title,
                        'salary' => $competitor->offer,
                    ]);
                    break;
                }
            }
        }

        // Retrieve the top 5 highest-paying freelancing jobs
        $data = collect($data)->sortByDesc('salary')->take(5);

        foreach ($data as $job) {
            array_push($topJobs, $job);
        }

        // Return
        return $topJobs;
    }

    public function MostNeededSkills($reports)
    {
        // Get skills
        $skills = [];
        $regJobs = RegJob::whereNotNull('accepted_individual')->get();
        $freelancingJobs = FreelancingJob::whereNotNull('accepted_user')->get();

        foreach ($regJobs as $regJob) {
            foreach ($regJob->defJob->skills as $skill) {
                array_push($skills, $skill->name); // Collecting skill names
            }
        }

        foreach ($freelancingJobs as $freelancingJob) {
            foreach ($freelancingJob->defJob->skills as $skill) {
                array_push($skills, $skill->name); // Collecting skill names
            }
        }

        // Counts the occurrences of each distinct skill name in an array
        $skillCounts = array_count_values($skills);

        // sort array
        arsort($skillCounts);

        // Preparing the result
        $mostNeededSkills = [];
        foreach ($skillCounts as $skillName => $count) {
            $skill = Skill::where('name', $skillName)->first();
            array_push($mostNeededSkills, [
                'skill_id' => $skill->id,
                'title' => $skillName,
                'count' => $count,
            ]);
        }

        // Check reports
        if ($reports) {
            return $mostNeededSkills;
        }

        // Get the top 5 skills
        $topSkills = array_slice($mostNeededSkills, 0, 5);

        // Return
        return $topSkills;
    }

    public function MostPostingCompanies()
    {
        // Get companies
        $companies = [];
        $regJobs = RegJob::whereNotNull('accepted_individual')->get();

        foreach ($regJobs as $regJob) {
            array_push($companies, $regJob->company->name);
        }

        // Counts the occurrences of each distinct company name in an array
        $companyCounts = array_count_values($companies);

        // sort array
        arsort($companyCounts);

        // Preparing the result
        $MostPostingCompanies = [];
        foreach ($companyCounts as $companyName => $count) {
            $company = Company::where('name', $companyName)->first();
            array_push($MostPostingCompanies, [
                'company_id' => $company->user_id,
                'title' => $companyName,
                'count' => $count,
            ]);
        }

        // Get the top 5 companies
        $topCompanies = array_slice($MostPostingCompanies, 0, 5);

        // Return
        return $topCompanies;
    }

    public function Tops()
    {
        // Response
        return response()->json([
            "MostPayedRegJobs" => $this->MostPayedRegJobs(),
            "MostPostingCompanies" => $this->MostPostingCompanies(),
            "MostPayedFreelancingJobs" => $this->MostPayedFreelancingJobs(),
            "MostNeededSkills" => $this->MostNeededSkills(false),
        ], 200);
    }

    public function Stats()
    {
        $doneJobs = 0;
        $doneFreelancingJobs = 0;
        $doneFullTimeJobs = 0;
        $donePartTimeJobs = 0;
        $runningJobsFullTime = 0;
        $runningJobsPartTime = 0;
        $runningJobsFreelancing = 0;

        // Get user's count
        $companyRegistered = Company::count();
        $individualRegistered = Individual::count();

        // Get Jobs
        $defJobs = DefJob::all();

        foreach ($defJobs as $defJob) {
            $regJob = RegJob::where('defJob_id', $defJob->id)->first();
            $freelancingJob = FreelancingJob::where('defJob_id', $defJob->id)->first();
            if ($defJob->is_done) {
                $doneJobs++;
                if ($freelancingJob != null) {
                    $doneFreelancingJobs++;
                } else if ($regJob != null) {
                    if ($regJob->type == 'FullTime') {
                        $doneFullTimeJobs++;
                    } else {
                        $donePartTimeJobs++;
                    }
                }
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
            if ($freelancingJob != null) {
                $runningJobsFreelancing++;
            }
        }

        // Response data
        $stats = [
            [
                'id' => 1,
                "data" => $doneJobs,
                "name" => [
                    "en" => "All Done Jobs",
                    "ar" => "جميع الوظائف المنتهية"
                ]
            ],
            [
                'id' => 2,
                "data" => $individualRegistered,
                "name" => [
                    "en" => "Registered Individuals",
                    "ar" => "الأفراد المسجلين"
                ]
            ],
            [
                'id' => 3,
                "data" => $runningJobsFullTime,
                "name" => [
                    "en" => "Total Running FullTime Job",
                    "ar" => "جميع أعمال الدوام الكامل الجارية"
                ]
            ],
            [
                'id' => 4,
                "data" => $runningJobsPartTime,
                "name" => [
                    "en" => "Total Running PartTime Job",
                    "ar" => "جميع أعمال الدوام الكامل الجارية"
                ]
            ],
            [
                'id' => 5,
                "data" => $runningJobsFreelancing,
                "name" => [
                    "en" => "Total Running Freelancing Job",
                    "ar" => "جميع أعمال الدوام الجزئي الجارية"
                ]
            ],
            [
                'id' => 6,
                "data" => $companyRegistered,
                "name" => [
                    "en" => "Exhibiting Companies",
                    "ar" => "الشركات المسجلة "
                ]
            ],
            [
                'id' => 7,
                "data" => $doneFullTimeJobs,
                "name" => [
                    "en" => "Done FullTime Jobs",
                    "ar" => "أعمال الدوام الكامل المنتهية"
                ]
            ],
            [
                'id' => 8,
                "data" => $donePartTimeJobs,
                "name" => [
                    "en" => "Done PartTime Jobs",
                    "ar" => "أعمال الدوام الكامل المنتهية"
                ]
            ],
            [
                'id' => 9,
                "data" => $doneFreelancingJobs,
                "name" => [
                    "en" => "Done Freelancing Jobs",
                    "ar" => "أعمال الدوام الجزئي المنتهية"
                ]
            ],
        ];

        // Response
        return response()->json([
            "stats" => $stats,
        ], 200);
    }
}
