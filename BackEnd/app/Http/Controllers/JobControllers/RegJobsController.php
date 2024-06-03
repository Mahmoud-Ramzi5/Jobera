<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Models\Individual;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\RegJobCompetetor;
use App\Filters\JobFilter;
use App\Policies\RegJobPolicy;
use Illuminate\Http\Request;
use App\Http\Requests\AddRegJobRequest;
use App\Http\Requests\ApplyRegJobRequest;
use App\Http\Resources\RegJobResource;
use App\Http\Resources\RegJobCollection;
use App\Http\Resources\RegJobCompetetorResource;
use App\Http\Resources\RegJobCompetetorCollection;

class RegJobsController extends Controller
{
    public function PostRegJob(AddRegJobRequest $request)
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

        // Check policy
        $policy = new RegJobPolicy();

        if (!$policy->PostRegJob(User::find($user->id))) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }
        $company = Company::where('user_id', $user->id)->first();

        $validated['company_id'] = $company->id;
        $validated['is_done'] = false;
        $job = DefJob::create($validated);
        $validated['defJob_id'] = $job->id;
        $Regjob = RegJob::create($validated);
        $Regjob->skills()->attach($validated['skills']);

        // Response
        return response()->json([
            "message" => "Job created successfully",
            "job" => new RegJobResource($Regjob)
        ], 201);
    }

    public function ViewRegJobs(Request $request)
    {
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);

        // Response
        if (empty($queryItems)) {
            return response()->json([
                'jobs' => new RegJobCollection(RegJob::all()),
            ], 200);
        }

        // Response
        return response()->json([
            'jobs' => new RegJobCollection(RegJob::where($queryItems)->get()->all()),
        ], 200);
    }

    public function ShowRegJob(Request $request, RegJob $regJob)
    {
        // Response
        return response()->json([
            'job' => new RegJobResource($regJob),
        ], 200);
    }

    public function ViewRegJobCompetetors(Request $request, RegJob $regJob)
    {
        // Response
        return response()->json([
            'job_competetors' => new RegJobCompetetorCollection($regJob->competetors),
        ], 200);
    }

    public function ApplyRegJob(ApplyRegJobRequest $request)
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

        // Check policy
        $policy = new RegJobPolicy();

        if (!$policy->ApplyRegJob(User::find($user->id))) {
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        $individual = Individual::where('user_id', $user->id)->first();
        $validated['individual_id'] = $individual->id;
        $RegJobCompetetor = RegJobCompetetor::create($validated);

        // Response
        return response()->json([
            'job_competetor' => new RegJobCompetetorResource($RegJobCompetetor)
        ], 200);
    }

    public function DeleteRegJob(Request $request, RegJob $regJob)
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
        $policy = new RegJobPolicy();

        if (!$policy->DeleteRegJob(User::find($user->id), $regJob)) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        // Delete job
        $regJob->delete();

        // Response
        return response()->json([
            "message" => "Job has been deleted successfully"
        ], 204);
    }
}
