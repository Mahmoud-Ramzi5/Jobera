<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\RegJob;
use Illuminate\Http\Request;
use App\Http\Requests\AddJobRequest;
use App\Http\Resources\JobResource;

class JobsController extends Controller
{
    public function PostJob(AddJobRequest $request)
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
            "job" => new JobResource($job)
        ]);
    }
}
