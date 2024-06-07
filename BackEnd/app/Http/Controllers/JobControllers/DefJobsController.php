<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\FreelancingJob;
use Illuminate\Http\Request;
use App\Http\Resources\RegJobResource;
use App\Http\Resources\FreelancingJobResource;

class DefJobsController extends Controller
{
    public function ShowAllJobs(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
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
                'path' => $defJobs->path()
            ]
        ], 200);
    }

    public function ShowSpecificJob(Request $request, $id)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get job
        $defJob = DefJob::find($id);

        // Check job
        if ($defJob == null) {
            return response()->json([
                'errors' => ['job' => 'Job was not found']
            ], 401);
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
                'errors' => ['job' => 'Job was not found']
            ], 404);
        }

        // Response
        return response()->json([
            'job' => $job
        ], 200);
    }
}
