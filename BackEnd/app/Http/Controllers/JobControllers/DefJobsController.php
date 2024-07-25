<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\Company;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\FreelancingJob;
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
        $defJobs = DefJob::paginate(10);
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

    public function PostedJobs()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Check company
        $company = Company::where('user_id', $user->id)->first();

        // Check RegJobs
        $RegJobs = [];
        if ($company) {
            $RegJobs = $company->regJobs;
        }

        // Check FreelancingJobs
        $FreelancingJobs = FreelancingJob::where('user_id', $user->id)->get();

        // Response
        return response()->json([
            "RegJobs" => new RegJobCollection($RegJobs),
            "FreelancingJobs" => new FreelancingJobCollection($FreelancingJobs),
        ], 200);
    }

    public function AppliedJobs()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Check Individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check RegJobs
        $regJobsApplied = [];
        if ($individual != null) {
            $RegJobs = RegJob::all();
            foreach ($RegJobs as $RegJob) {
                if ($RegJob->accepted_individual == $individual->id) {
                    array_push($regJobsApplied, [
                        "regJob" => new RegJobResource($RegJob),
                        "status" => "Accepted"
                    ]);
                    continue;
                }
                $competitors = $RegJob->competitors;
                foreach ($competitors as $competitor) {
                    if ($competitor->individual_id == $individual->id) {
                        if ($RegJob->accepted_individual != null) {
                            array_push($regJobsApplied, [
                                "regJob" => new RegJobResource($RegJob),
                                "status" => "Refused",
                                "offer" => new RegJobCompetitorResource($competitor)
                            ]);
                            continue;
                        }
                        array_push($regJobsApplied, [
                            "regJob" => new RegJobResource($RegJob),
                            "status" => "Pending",
                            "offer" => new RegJobCompetitorResource($competitor)
                        ]);
                    }
                }
            }
        }

        // Check FreelancingJobs
        $freelancingJobsApplied = [];
        $FreelancingJobs = FreelancingJob::all();
        foreach ($FreelancingJobs as $freelancingJob) {
            if ($freelancingJob->accepted_user == $user->id) {
                array_push($freelancingJobsApplied, [
                    "freelancingJob" => new FreelancingJobResource($freelancingJob),
                    "status" => "Accepted"
                ]);
                continue;
            }
            $competitors = $freelancingJob->competitors;
            foreach ($competitors as $competitor) {
                if ($competitor->user_id == $user->id) {
                    if ($freelancingJob->acceptedUser != null) {
                        array_push($freelancingJobsApplied, [
                            "freelancingJob" => new FreelancingJobResource($freelancingJob),
                            "status" => "Refused",
                            "offer" => new FreelancingJobCompetitorResource($competitor)
                        ]);
                        continue;
                    }
                    array_push($freelancingJobsApplied, [
                        "freelancingJob" => new FreelancingJobResource($freelancingJob),
                        "status" => "Pending",
                        "offer" => new FreelancingJobCompetitorResource($competitor)
                    ]);
                }
            }
        }

        // Response
        return response()->json([
            "RegJobs" => $regJobsApplied,
            "FreelancingJobs" => $freelancingJobsApplied
        ], 200);
    }

    public function FlagedJobs()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get FlagedJobs
        $jobs = [];
        $defJobs = $user->FlagedJobs;
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

    public function FlagJob(Request $request, $id)
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
    $flagedJobs = $user->FlagedJobs()->pluck('defJob_id')->toArray();

    // Check if job is already flagged
    if (in_array($defJob->id, $flagedJobs)) {
        $user->FlagedJobs()->detach($defJob->id);
        return response()->json([
            "message" => "Job is unflagged"
        ], 200);
    } else {
        $user->FlagedJobs()->attach($defJob->id);
        return response()->json([
            "message" => "Job is flagged"
        ], 200);
    }
}

    public function IsFlaged(Request $request,$id){
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
        $flagedJobs = $user->FlagedJobs()->pluck('defJob_id')->toArray();
        if (in_array($defJob->id, $flagedJobs)){
            return response()->json([
                "message"=>"Job is bookmarked"
            ],200);
        }
        else{
            return response()->json([
                "message"=>"Job is not bookmarked"
            ],201);
        }
    }
}
