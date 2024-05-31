<?php

namespace App\Http\Controllers;

use App\Filters\JobFilter;
use App\Models\RegJob;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\FreelancingJob;
use App\Http\Resources\JobResource;
use App\Http\Requests\AddJobRequest;
use App\Http\Resources\RegJobResource;
use App\Http\Requests\AddRegJobRequest;
use App\Http\Resources\RegJobCollection;
use App\Http\Resources\FreelancingJobResource;
use App\Http\Requests\AddFreelancingJobRequest;
use App\Http\Resources\FreelancingJobCollection;

class JobsController extends Controller
{
    public function PostRegJob(AddRegJobRequest $request)
    {
        $validated = $request->validated();

        // Get user
        $user = auth()->user();
        $company = Company::where('user_id', $user->id)->get();

        // Check user
        if ($company == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        $validated['company_id'] = $company->id;
        $job = RegJob::create($validated);

        return response()->json([
            "message" => "Job created successfully",
            "job" => new RegJobResource($job)
        ]);
    }

    public function PostFreelancingJob(AddFreelancingJobRequest $request)
    {
        $validated = $request->validated();

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        $validated['user_id'] = $user->id;
        $job = FreelancingJob::create($validated);

        return response()->json([
            "message" => "Job created successfully",
            "job" => new FreelancingJobResource($job)
        ]);
    }

    public function ViewRegJobs(Request $request){
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);

        // Response
        if (empty($queryItems)) {
            return response()->json([
                'Jobs' => new RegJobCollection(RegJob::all()),
            ], 200);
        }

        // Response
        return response()->json([
            'Jobs' => new RegJobCollection(RegJob::where($queryItems)->get()->all()),
        ], 200);
    }
    public function ViewFreelancingJobs(Request $request){
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);

        // Response
        if (empty($queryItems)) {
            return response()->json([
                'Jobs' => new FreelancingJobCollection(FreelancingJob::all()),
            ], 200);
        }

        // Response
        return response()->json([
            'Jobs' => new FreelancingJobCollection(FreelancingJob::where($queryItems)->get()->all()),
        ], 200);
    }
    
}
