<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\FreelancingJobCollection;
use App\Http\Resources\FreelancingJobResource;
use App\Http\Resources\RegJobCollection;
use App\Http\Resources\RegJobResource;
use App\Models\Company;
use App\Models\DefJob;
use App\Models\FreelancingJob;
use App\Models\Individual;
use App\Models\RegJob;
use Illuminate\Http\Request;

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
    public function JobYouPosted()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }
        $company = Company::where('user_id', $user->id)->first();
        $RegJobs = [];
        if ($company) {
            $RegJobs = $company->regJobs;
        }
        $FreelancingJobs = FreelancingJob::where('user_id', $user->id)->get();
        return response()->json([
            "RegJobs" => new RegJobCollection($RegJobs),
            "FreelancingJobs" => new FreelancingJobCollection($FreelancingJobs),
        ]);
    }
    public function JobYouApplied()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }
        $individual = Individual::where('user_id', $user->id)->first();
        $regJobsApplied = [];
        if ($individual) {
            $RegJobs = RegJob::all();
            foreach ($RegJobs as $RegJob) {
                if ($RegJob->accepted_individual == $individual->id) {
                    array_push($regJobsApplied, [
                        "regJob"=>new RegJobResource($RegJob),
                        "status"=>"Accepted"
                    ]);
                    continue;
                }
                $competitors = $RegJob->competitors;
                foreach ($competitors as $competitor) {
                    if ($competitor->individual_id == $individual->id) {
                        if($RegJob->accepted_individual!=null){
                            array_push($freelancingJobsApplied, [
                                "RegJob"=>new RegJobResource($RegJob),
                                "status"=>"Refused"
                            ]);
                            continue;
                        }
                        array_push($regJobsApplied, [
                            "regJob"=>new RegJobResource($RegJob),
                            "status"=>"Pending"
                        ]);
                    }

                }
            }

        }
        $freelancingJobsApplied = [];
        $FreelancingJobs = FreelancingJob::all();
        foreach ($FreelancingJobs as $freelancingJob) {
            if ($freelancingJob->accepted_user == $user->id) {
                array_push($freelancingJobsApplied, [
                    "freelancingJob"=>new FreelancingJobResource($freelancingJob),
                    "status"=>"Accepted"
                ]);
                continue;
            }
            $competitors = $freelancingJob->competitors;
            foreach ($competitors as $competitor) {
                if ($competitor->user_id == $user->id) {
                    if($freelancingJob->acceptedUser!=null){
                        array_push($freelancingJobsApplied, [
                            "freelancingJob"=>new FreelancingJobResource($freelancingJob),
                            "status"=>"Refused"
                        ]);
                        continue;
                    }
                    array_push($freelancingJobsApplied, [
                        "freelancingJob"=>new FreelancingJobResource($freelancingJob),
                        "status"=>"Pending"
                    ]);
                }

            }
        }
        return response()->json([
            "RegJobs" => $regJobsApplied,
            "FreelancingJobs" => $freelancingJobsApplied     
        ]);
    }
}
