<?php

namespace App\Http\Controllers\JobControllers;

use App\Filters\JobFilter;
use App\Http\Resources\FreelancingJobCompetetorCollection;
use Illuminate\Http\Request;
use App\Models\FreelancingJob;
use App\Http\Controllers\Controller;
use App\Models\FreelancingJobCompetetor;
use App\Http\Resources\FreelancingJobResource;
use App\Http\Requests\AddFreelancingJobRequest;
use App\Http\Resources\FreelancingJobCollection;
use App\Http\Requests\ApplyFreelancingJobRequest;
use App\Http\Resources\FreelancingJobCompetetorResource;

class FreelancingJobsController extends Controller{
    public function PostFreelancingJob(AddFreelancingJobRequest $request)
    {
        $validated = $request->validated();

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => 'Invalid user'
            ], 401);
        }

        $validated['user_id'] = $user->id;
        $job = FreelancingJob::create($validated);

        return response()->json([
            "message" => "Job created successfully",
            "job" => new FreelancingJobResource($job)
        ]);
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
    public function ShowFreelancingJob(Request $request,FreelancingJob $freelancingJob){
        return new FreelancingJobResource($freelancingJob);
    }
    public function DeleteFreelancingJob(Request $request,FreelancingJob $freelancingJob)
    {
        $freelancingJob->delete();

        return response()->json([
            "message"=>"Job deleted successfully"
        ]);
    }

    public function ApplyFreelancingJob(ApplyFreelancingJobRequest $request){
        // Get user
        $user = auth()->user();
        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => 'Invalid user'
            ], 401);
        }
        $validated['user_id']=$user->id;
        $validated=$request->validated();
        $FreelancingJobCompetetor=FreelancingJobCompetetor::create($validated);
        return new FreelancingJobCompetetorResource($FreelancingJobCompetetor);
    }
    public function ViewFreelancingJobCompetetors(Request $request,FreelancingJob $freelancingJob){
        $competetors=$freelancingJob->competetors()->get();
        return new FreelancingJobCompetetorCollection($competetors);
    }
    
}