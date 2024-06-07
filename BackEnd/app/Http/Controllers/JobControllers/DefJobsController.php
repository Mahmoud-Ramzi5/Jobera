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
        foreach ($defJobs as $defjob) {
            $regJob = RegJob::where('defJob_id', $defjob->id)->first();
            $freelancingJob = FreelancingJob::where('defJob_id', $defjob->id)->first();
            if ($regJob == null) {
                array_push($jobs, new FreelancingJobResource($freelancingJob));
            } else {
                array_push($jobs, new RegJobResource($regJob));
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


    public function ShowSpecificJobs(Request $request)
    {
        // Get queries
        $startIndex = $request->query('startIndex');
        $dataSize = $request->query('dataSize');

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get paginated jobs
        $count = 0;
        $jobs = [];
        $defJobs = DefJob::where('id', '>=', $startIndex)->get();
        foreach ($defJobs as $defjob) {
            $regJob = RegJob::where('defJob_id', $defjob->id)->first();
            $freelancingJob = FreelancingJob::where('defJob_id', $defjob->id)->first();
            if ($regJob == null) {
                array_push($jobs, new FreelancingJobResource($freelancingJob));
            } else {
                array_push($jobs, new RegJobResource($regJob));
            }

            // Break when reached what was requested
            $count += 1;
            if ($count >= $dataSize) {
                break;
            }
        }

        // Response
        return response()->json([
            'jobs' => $jobs
        ], 200);
    }
}
