<?php

namespace App\Http\Controllers\JobControllers;

use App\Models\BookmarkedJob;
use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\Company;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\FreelancingJob;
use App\Models\RegJobCompetitor;
use App\Models\FreelancingJobCompetitor;
use App\Filters\JobFilter;
use Illuminate\Http\Request;
use App\Http\Resources\RegJobResource;
use App\Http\Resources\RegJobCollection;
use App\Http\Resources\RegJobCompetitorResource;
use App\Http\Resources\FreelancingJobResource;
use App\Http\Resources\FreelancingJobCollection;
use App\Http\Resources\FreelancingJobCompetitorResource;


class DefJobsController extends Controller
{
    public function ShowAllJobs(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get all jobs
        $jobs = [];
        $defJobs = DefJob::where('is_done', false)->orderByDesc('created_at')->paginate(10);
        foreach ($defJobs as $defJob) {
            $regJob = RegJob::where('defJob_id', $defJob->id)->first();
            $freelancingJob = FreelancingJob::where('defJob_id', $defJob->id)->first();
            if ($regJob != null) {
                array_push($jobs, new RegJobResource($regJob));
            } else if ($freelancingJob != null) {
                array_push($jobs, new FreelancingJobResource($freelancingJob));
            } else {
                continue;
            }
        }

        // Response
        return response()->json([
            'jobs' => $jobs,
            'pagination_data' => [
                'from' => $defJobs->firstItem(),
                'to' => $defJobs->lastItem(),
                'per_page' => $defJobs->perPage(),
                'total' => $defJobs->total(),
                'first_page' => 1,
                'current_page' => $defJobs->currentPage(),
                'last_page' => $defJobs->lastPage(),
                'has_more_pages' => $defJobs->hasMorePages(),
                'first_page_url' => $defJobs->url(1),
                'current_page_url' => $defJobs->url($defJobs->currentPage()),
                'last_page_url' => $defJobs->url($defJobs->lastPage()),
                'next_page' => $defJobs->nextPageUrl(),
                'prev_page' => $defJobs->previousPageUrl(),
                'path' => $defJobs->path(),
            ],
        ], 200);
    }

    public function ShowSpecificJob(Request $request, $id)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get job
        $defJob = DefJob::find($id);

        // Check job
        if ($defJob == null) {
            return response()->json([
                'errors' => ['job' => 'Job was not found'],
            ], 404);
        }

        $regJob = RegJob::where('defJob_id', $defJob->id)->first();
        $freelancingJob = FreelancingJob::where('defJob_id', $defJob->id)->first();
        if ($regJob != null) {
            $job = new RegJobResource($regJob);
        } else if ($freelancingJob != null) {
            $job = new FreelancingJobResource($freelancingJob);
        } else {
            // Response
            return response()->json([
                'errors' => ['job' => 'Job was not found'],
            ], 404);
        }

        // Response
        return response()->json([
            'job' => $job,
        ], 200);
    }

    public function PostedJobs(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Filter
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);

        // Check company
        $company = Company::where('user_id', $user->id)->first();

        // Initialize jobs
        $jobs = [];
        $jobsData = [];
        $jobType = 'RegularJob';

        // Response
        if (!empty($queryItems)) {
            // Check Job Type
            $type = $queryItems[0][2];
            if (isset($type)) {
                if ($company && $type == 'FullTime') {
                    $jobs = RegJob::where('user_id', $user->id)
                        ->where($queryItems)->paginate(10);
                } else if ($company && $type == 'PartTime') {
                    $jobs = RegJob::where('user_id', $user->id)
                        ->where($queryItems)->paginate(10);
                } else {
                    unset($queryItems[0]);
                    $jobType = 'Freelancing';
                    $jobs = FreelancingJob::where('user_id', $user->id)
                        ->where($queryItems)->paginate(10);
                }

                // Check skills
                $skills = $request->input('skills');
                if (isset($skills)) {
                    $skills = explode(",", trim($skills, '[]'));
                    if (sizeof($skills) >= 1 && $skills[0] != "") {
                        foreach ($jobs->items() as $job) {
                            foreach ($job->defJob->skills as $skill) {
                                if (in_array($skill->name, $skills) && !in_array($job, $jobsData)) {
                                    if ($jobType == 'RegularJob') {
                                        array_push($jobsData, new RegJobResource($job));
                                    } else {
                                        array_push($jobsData, new FreelancingJobResource($job));
                                    }
                                }
                            };
                        }
                    } else {
                        foreach ($jobs->items() as $job) {
                            if (!in_array($job, $jobsData)) {
                                if ($jobType == 'RegularJob') {
                                    array_push($jobsData, new RegJobResource($job));
                                } else {
                                    array_push($jobsData, new FreelancingJobResource($job));
                                }
                            }
                        }
                    }
                } else {
                    foreach ($jobs->items() as $job) {
                        if (!in_array($job, $jobsData)) {
                            if ($jobType == 'RegularJob') {
                                array_push($jobsData, new RegJobResource($job));
                            } else {
                                array_push($jobsData, new FreelancingJobResource($job));
                            }
                        }
                    }
                }
            } else {
                // Response
                return response()->json([
                    'errors' => ['type' => 'Invalid JobType'],
                ], 404);
            }

            // Custom Response
            return response()->json([
                'jobs' => $jobsData,
                'pagination_data' => [
                    'from' => $jobs->firstItem(),
                    'to' => $jobs->lastItem(),
                    'per_page' => $jobs->perPage(),
                    'total' => $jobs->total(),
                    'first_page' => 1,
                    'current_page' => $jobs->currentPage(),
                    'last_page' => $jobs->lastPage(),
                    'has_more_pages' => $jobs->hasMorePages(),
                    'first_page_url' => $jobs->url(1),
                    'current_page_url' => $jobs->url($jobs->currentPage()),
                    'last_page_url' => $jobs->url($jobs->lastPage()),
                    'next_page' => $jobs->nextPageUrl(),
                    'prev_page' => $jobs->previousPageUrl(),
                    'path' => $jobs->path()
                ]
            ], 200);
        } else {
            // Response
            return response()->json([
                'errors' => ['type' => 'Invalid JobType'],
            ], 404);
        }
    }

    public function AppliedJobs(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Filter
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);

        // Check Individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Initialize jobs
        $jobs = [];
        $jobsData = [];
        $competitors = [];
        $jobType = 'RegularJob';

        // Response
        if (!empty($queryItems)) {
            // Check Job Type
            $type = $queryItems[0][2];
            if (isset($type)) {
                if ($individual && ($type == 'FullTime' || $type == 'PartTime')) {
                    $competitors = RegJobCompetitor::where('individual_id', $individual->id)->paginate(10);
                } else {
                    unset($queryItems[0]);
                    $jobType = 'Freelancing';
                    $competitors = FreelancingJobCompetitor::where('user_id', $user->id)->paginate(10);
                }

                // Check skills
                $skills = $request->input('skills');
                if (isset($skills)) {
                    $skills = explode(",", trim($skills, '[]'));
                    if (sizeof($skills) >= 1 && $skills[0] != "") {
                        if ($jobType == 'RegularJob') {
                            foreach ($competitors as $competitor) {
                                $job = RegJob::where('id', $competitor->job_id)
                                    ->where($queryItems)->first();

                                foreach ($job->defJob->skills as $skill) {
                                    if (in_array($skill->name, $skills) && !in_array($job, $jobsData)) {
                                        if ($job->accepted_individual != null) {
                                            if ($job->accepted_individual == $individual->id) {
                                                array_push($jobsData, [
                                                    "user_offer" => new RegJobCompetitorResource($competitor),
                                                    "job_data" => [
                                                        "defJob_id" => $job->defJob_id,
                                                        "title" => $job->defJob->title,
                                                        "photo" => $job->defJob->photo,
                                                        "status" => "Accepted"
                                                    ]
                                                ]);
                                            } else {
                                                array_push($jobsData, [
                                                    "user_offer" => new RegJobCompetitorResource($competitor),
                                                    "job_data" => [
                                                        "defJob_id" => $job->defJob_id,
                                                        "title" => $job->defJob->title,
                                                        "photo" => $job->defJob->photo,
                                                        "status" => "Refused"
                                                    ]
                                                ]);
                                            }
                                        } else {
                                            array_push($jobsData, [
                                                "user_offer" => new RegJobCompetitorResource($competitor),
                                                "job_data" => [
                                                    "defJob_id" => $job->defJob_id,
                                                    "title" => $job->defJob->title,
                                                    "photo" => $job->defJob->photo,
                                                    "status" => "Pending"
                                                ]
                                            ]);
                                        }
                                    }
                                }
                            }
                        } else {
                            foreach ($competitors as $competitor) {
                                $job = FreelancingJob::where('id', $competitor->job_id)
                                    ->where($queryItems)->first();

                                foreach ($job->defJob->skills as $skill) {
                                    if (in_array($skill->name, $skills) && !in_array($job, $jobsData)) {
                                        if ($job->accepted_user != null) {
                                            if ($job->accepted_user == $user->id) {
                                                array_push($jobsData, [
                                                    "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                                    "job_data" => [
                                                        "defJob_id" => $job->defJob_id,
                                                        "title" => $job->defJob->title,
                                                        "photo" => $job->defJob->photo,
                                                        "status" => "Accepted"
                                                    ]
                                                ]);
                                            } else {
                                                array_push($jobsData, [
                                                    "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                                    "job_data" => [
                                                        "defJob_id" => $job->defJob_id,
                                                        "title" => $job->defJob->title,
                                                        "photo" => $job->defJob->photo,
                                                        "status" => "Refused"
                                                    ]
                                                ]);
                                            }
                                        } else {
                                            array_push($jobsData, [
                                                "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                                "job_data" => [
                                                    "defJob_id" => $job->defJob_id,
                                                    "title" => $job->defJob->title,
                                                    "photo" => $job->defJob->photo,
                                                    "status" => "Pending"
                                                ]
                                            ]);
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if ($jobType == 'RegularJob') {
                            foreach ($competitors as $competitor) {
                                $job = RegJob::where('id', $competitor->job_id)
                                    ->where($queryItems)->first();

                                if (!in_array($job, $jobsData)) {
                                    if ($job->accepted_individual != null) {
                                        if ($job->accepted_individual == $individual->id) {
                                            array_push($jobsData, [
                                                "user_offer" => new RegJobCompetitorResource($competitor),
                                                "job_data" => [
                                                    "defJob_id" => $job->defJob_id,
                                                    "title" => $job->defJob->title,
                                                    "photo" => $job->defJob->photo,
                                                    "status" => "Accepted"
                                                ]
                                            ]);
                                        } else {
                                            array_push($jobsData, [
                                                "user_offer" => new RegJobCompetitorResource($competitor),
                                                "job_data" => [
                                                    "defJob_id" => $job->defJob_id,
                                                    "title" => $job->defJob->title,
                                                    "photo" => $job->defJob->photo,
                                                    "status" => "Refused"
                                                ]
                                            ]);
                                        }
                                    } else {
                                        array_push($jobsData, [
                                            "user_offer" => new RegJobCompetitorResource($competitor),
                                            "job_data" => [
                                                "defJob_id" => $job->defJob_id,
                                                "title" => $job->defJob->title,
                                                "photo" => $job->defJob->photo,
                                                "status" => "Pending"
                                            ]
                                        ]);
                                    }
                                }
                            }
                        } else {
                            foreach ($competitors as $competitor) {
                                $job = FreelancingJob::where('id', $competitor->job_id)
                                    ->where($queryItems)->first();

                                if (!in_array($job, $jobsData)) {
                                    if ($job->accepted_user != null) {
                                        if ($job->accepted_user == $user->id) {
                                            array_push($jobsData, [
                                                "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                                "job_data" => [
                                                    "defJob_id" => $job->defJob_id,
                                                    "title" => $job->defJob->title,
                                                    "photo" => $job->defJob->photo,
                                                    "status" => "Accepted"
                                                ]
                                            ]);
                                        } else {
                                            array_push($jobsData, [
                                                "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                                "job_data" => [
                                                    "defJob_id" => $job->defJob_id,
                                                    "title" => $job->defJob->title,
                                                    "photo" => $job->defJob->photo,
                                                    "status" => "Refused"
                                                ]
                                            ]);
                                        }
                                    } else {
                                        array_push($jobsData, [
                                            "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                            "job_data" => [
                                                "defJob_id" => $job->defJob_id,
                                                "title" => $job->defJob->title,
                                                "photo" => $job->defJob->photo,
                                                "status" => "Pending"
                                            ]
                                        ]);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if ($jobType == 'RegularJob') {
                        foreach ($competitors as $competitor) {
                            $job = RegJob::where('id', $competitor->job_id)
                                ->where($queryItems)->first();

                            if (!in_array($job, $jobsData)) {
                                if ($job->accepted_individual != null) {
                                    if ($job->accepted_individual == $individual->id) {
                                        array_push($jobsData, [
                                            "user_offer" => new RegJobCompetitorResource($competitor),
                                            "job_data" => [
                                                "defJob_id" => $job->defJob_id,
                                                "title" => $job->defJob->title,
                                                "photo" => $job->defJob->photo,
                                                "status" => "Accepted"
                                            ]
                                        ]);
                                    } else {
                                        array_push($jobsData, [
                                            "user_offer" => new RegJobCompetitorResource($competitor),
                                            "job_data" => [
                                                "defJob_id" => $job->defJob_id,
                                                "title" => $job->defJob->title,
                                                "photo" => $job->defJob->photo,
                                                "status" => "Refused"
                                            ]
                                        ]);
                                    }
                                } else {
                                    array_push($jobsData, [
                                        "user_offer" => new RegJobCompetitorResource($competitor),
                                        "job_data" => [
                                            "defJob_id" => $job->defJob_id,
                                            "title" => $job->defJob->title,
                                            "photo" => $job->defJob->photo,
                                            "status" => "Pending"
                                        ]
                                    ]);
                                }
                            }
                        }
                    } else {
                        foreach ($competitors as $competitor) {
                            $job = FreelancingJob::where('id', $competitor->job_id)
                                ->where($queryItems)->first();

                            if (!in_array($job, $jobsData)) {
                                if ($job->accepted_user != null) {
                                    if ($job->accepted_user == $user->id) {
                                        array_push($jobsData, [
                                            "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                            "job_data" => [
                                                "defJob_id" => $job->defJob_id,
                                                "title" => $job->defJob->title,
                                                "photo" => $job->defJob->photo,
                                                "status" => "Accepted"
                                            ]
                                        ]);
                                    } else {
                                        array_push($jobsData, [
                                            "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                            "job_data" => [
                                                "defJob_id" => $job->defJob_id,
                                                "title" => $job->defJob->title,
                                                "photo" => $job->defJob->photo,
                                                "status" => "Refused"
                                            ]
                                        ]);
                                    }
                                } else {
                                    array_push($jobsData, [
                                        "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                        "job_data" => [
                                            "defJob_id" => $job->defJob_id,
                                            "title" => $job->defJob->title,
                                            "photo" => $job->defJob->photo,
                                            "status" => "Pending"
                                        ]
                                    ]);
                                }
                            }
                        }
                    }
                }
            } else {
                // Response
                return response()->json([
                    'errors' => ['type' => 'Invalid JobType'],
                ], 404);
            }

            // Custom Response
            return response()->json([
                'jobs' => $jobsData,
                'pagination_data' => [
                    'from' => $competitors->firstItem(),
                    'to' => $competitors->lastItem(),
                    'per_page' => $competitors->perPage(),
                    'total' => $competitors->total(),
                    'first_page' => 1,
                    'current_page' => $competitors->currentPage(),
                    'last_page' => $competitors->lastPage(),
                    'has_more_pages' => $competitors->hasMorePages(),
                    'first_page_url' => $competitors->url(1),
                    'current_page_url' => $competitors->url($competitors->currentPage()),
                    'last_page_url' => $competitors->url($competitors->lastPage()),
                    'next_page' => $competitors->nextPageUrl(),
                    'prev_page' => $competitors->previousPageUrl(),
                    'path' => $competitors->path()
                ]
            ], 200);
        } else {
            // Response
            return response()->json([
                'errors' => ['type' => 'Invalid JobType'],
            ], 404);
        }
    }

    public function BookmarkedJobs()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get flagged jobs
        $jobs = [];
        $defJobs = $user->bookmarkedJobs;
        foreach ($defJobs as $defJob) {
            $regJob = RegJob::where('defJob_id', $defJob->id)->first();
            $freelancingJob = FreelancingJob::where('defJob_id', $defJob->id)->first();
            if ($regJob != null) {
                array_push($jobs, new RegJobResource($regJob));
            } else if ($freelancingJob != null) {
                array_push($jobs, new FreelancingJobResource($freelancingJob));
            } else {
                continue;
            }
        }

        // Response
        return response()->json([
            "jobs" => $jobs
        ], 200);
    }

    public function BookmarkJob(Request $request, $id)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get job
        $defJob = DefJob::find($id);

        // Check job
        if ($defJob == null) {
            return response()->json([
                'errors' => ['job' => 'Job was not found'],
            ], 404);
        }

        // Get flagged jobs
        $bookmarkedJobs = $user->bookmarkedJobs()->pluck('defJob_id')->toArray();

        // Check if job is already flagged
        if (in_array($defJob->id, $bookmarkedJobs)) {
            $user->bookmarkedJobs()->detach($defJob->id);

            // Response
            return response()->json([
                "is_flagged" => false
            ], 200);
        } else {
            $user->bookmarkedJobs()->attach($defJob->id);

            // Response
            return response()->json([
                "is_flagged" => true
            ], 200);
        }
    }
}
