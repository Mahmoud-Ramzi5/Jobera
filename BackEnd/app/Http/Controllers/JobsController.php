<?php

namespace App\Http\Controllers;

use App\Http\Resources\FreelancingJobResource;
use App\Models\FreelancingJob;
use App\Models\RegJob;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Resources\JobResource;
use App\Http\Requests\AddJobRequest;
use App\Http\Resources\RegJobResource;
use App\Http\Requests\AddRegJobRequest;
use App\Http\Resources\RegJobCollection;
use App\Http\Requests\AddFreelancingJobRequest;

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
                'user' => 'Invalid user'
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

    public function ViewFullTime(){
        $jobs=RegJob::where("type","full")->get();
        return new RegJobCollection($jobs);
    }
    public function ViewPartTime(){
        $jobs=RegJob::where("type","part")->get();
        return new RegJobCollection($jobs);
    }
}
