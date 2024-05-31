<?php

namespace App\Http\Controllers\JobControllers;

use App\Models\User;
use App\Models\RegJob;
use App\Models\Company;
use App\Filters\JobFilter;
use App\Models\Individual;
use Illuminate\Http\Request;
use App\Policies\RegJobPolicy;
use App\Models\RegJobCompetetor;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\RegJobResource;
use App\Http\Requests\AddRegJobRequest;
use App\Http\Resources\RegJobCollection;
use App\Http\Requests\ApplyRegJobRequest;
use App\Http\Resources\RegJobCompetetorResource;
use App\Http\Resources\RegJobCompetetorCollection;

class RegJobsController extends Controller
{
    public function PostRegJob(AddRegJobRequest $request)
    {
        
        $validated = $request->validated();

        // Get user
        $user = auth()->user();
        
        $policy = new RegJobPolicy();

        if (!$policy->PostRegJob(User::find($user->id))) {
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }
        $company=Company::where('user_id',$user->id);

        $validated['company_id'] = $company->id;
        $job = RegJob::create($validated);

        return response()->json([
            "message" => "Job created successfully",
            "job" => new RegJobResource($job)
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
    public function ShowRegJob(Request $request,RegJob $regJob){
        return new RegJobResource($regJob);
    }
    public function DeleteRegJob(Request $request,RegJob $regJob)
    {
        $user=Auth::user();
        $policy = new RegJobPolicy();

        if (!$policy->DeleteRegJob(User::find($user->id),$regJob)) {
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        $regJob->delete();
        
        return response()->json([
            "message"=>"Job deleted successfully"
        ]);
    }
    public function ApplyRegJob(ApplyRegJobRequest $request){
        // Get user
        $user = auth()->user();
        $policy = new RegJobPolicy();

        if (!$policy->ApplyRegJob(User::find($user->id))) {
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        $individual=Individual::where('user_id',$user->id);
        $validated['individal_id']=$individual->id;
        $validated=$request->validated();
        $RegJobCompetetor= RegJobCompetetor::create($validated);
        return new RegJobCompetetorResource($RegJobCompetetor);
    }
    public function ViewRegJobCompetetors(Request $request,RegJob $regJob){
        $competetors=$regJob->competetors()->get();
        return new RegJobCompetetorCollection($competetors);
    }
}
