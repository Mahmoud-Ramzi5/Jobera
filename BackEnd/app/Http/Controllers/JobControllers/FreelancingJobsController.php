<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Models\Individual;
use App\Models\DefJob;
use App\Models\FreelancingJob;
use App\Models\FreelancingJobCompetetor;
use App\Filters\JobFilter;
use App\Policies\FreelancingJobPolicy;
use Illuminate\Http\Request;
use App\Http\Requests\AddFreelancingJobRequest;
use App\Http\Requests\ApplyFreelancingJobRequest;
use App\Http\Resources\FreelancingJobResource;
use App\Http\Resources\FreelancingJobCollection;
use App\Http\Resources\FreelancingJobCompetetorResource;
use App\Http\Resources\FreelancingJobCompetetorCollection;


class FreelancingJobsController extends Controller
{
    public function PostFreelancingJob(AddFreelancingJobRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        $validated['user_id'] = $user->id;
        $validated['is_done'] = false;
        $job = DefJob::create($validated);
        $validated['defJob_id'] = $job->id;
        $Freelancingjob = FreelancingJob::create($validated);
        $Freelancingjob->skills()->attach($validated['skills']);

        // Response
        return response()->json([
            "message" => "Job created successfully",
            "job" => new FreelancingJobResource($Freelancingjob)
        ], 201);
    }

    public function ViewFreelancingJobs(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Filter
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);

        // Response
        if (empty($queryItems)) {
            $jobs = FreelancingJob::paginate(10);
        } else {
            // Check if job filtered based on the user that posted the job
            for ($i = 0; $i < count($queryItems); $i++) {
                if ($queryItems[$i][0] == 'user_name') {
                    // Get user
                    $company = Company::where('name', $queryItems[$i][1], $queryItems[$i][2])->first();
                    $individual = Individual::where('full_name', $queryItems[$i][1], $queryItems[$i][2])->first();
                    if ($company !== null) {
                        $user_id = $company->user_id;
                    } else if ($individual !== null) {
                        $user_id = $individual->user_id;
                    } else {
                        $user_id = null;
                    }

                    $queryItems[$i][0] = 'user_id';
                    $queryItems[$i][1] = '=';
                    $queryItems[$i][2] = $user_id;
                }
            }

            // Get the job
            $jobs = FreelancingJob::where($queryItems)->paginate(10);
        }

        // Response
        return response()->json([
            'jobs' => new FreelancingJobCollection($jobs->items()),
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
    }

    public function ShowFreelancingJob(Request $request, FreelancingJob $freelancingJob)
    {
        // Response
        return response()->json([
            'job' => new FreelancingJobResource($freelancingJob),
        ], 200);
    }

    public function ViewFreelancingJobCompetetors(Request $request, FreelancingJob $freelancingJob)
    {
        // Response
        return response()->json([
            'job_competetors' => new FreelancingJobCompetetorCollection($freelancingJob->competetors),
        ], 200);
    }

    public function ApplyFreelancingJob(ApplyFreelancingJobRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        $validated['user_id'] = $user->id;
        $FreelancingJobCompetetor = FreelancingJobCompetetor::create($validated);

        // Response
        return response()->json([
            'job_competetor' => new FreelancingJobCompetetorResource($FreelancingJobCompetetor),
        ], 200);
    }

    public function DeleteFreelancingJob(Request $request, FreelancingJob $freelancingJob)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check policy
        $policy = new FreelancingJobPolicy();

        if (!$policy->DeleteFreelancingJob(User::find($user->id), $freelancingJob)) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        // Delete job
        $freelancingJob->delete();

        // Response
        return response()->json([
            "message" => "Job has been deleted successfully"
        ], 204);
    }
}
