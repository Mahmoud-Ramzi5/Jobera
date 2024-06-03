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
        $defJobs = DefJob::all();
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
            'jobs' => $jobs
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

        // Get all jobs
        $count = 0;
        $jobs = [];
        $defJobs = DefJob::where('id', '>=', $startIndex);
        foreach ($defJobs as $defjob) {
            while ($count < $dataSize) {
                $regJob = RegJob::where('defJob_id', $defjob->id)->first();
                $freelancingJob = FreelancingJob::where('defJob_id', $defjob->id)->first();
                if ($regJob == null) {
                    array_push($jobs, new FreelancingJobResource($freelancingJob));
                } else {
                    array_push($jobs, new RegJobResource($regJob));
                }
                $count += 1;
            }
        }

        // Response
        return response()->json([
            'jobs' => $jobs
        ], 200);
    }

}
