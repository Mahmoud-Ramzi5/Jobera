<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Individual;
use App\Models\Company;
use App\Models\Chat;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\RegJobCompetetor;
use App\Filters\JobFilter;
use App\Policies\RegJobPolicy;
use Illuminate\Http\Request;
use App\Http\Requests\AddRegJobRequest;
use App\Http\Requests\ApplyRegJobRequest;
use App\Http\Requests\AcceptIndividualRequest;
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
            $jobs = RegJob::paginate(10);
            $jobsData = $jobs->items();
        } else {
            // Check if job filtered based on the company that posted the job
            for ($i = 0; $i < count($queryItems); $i++) {
                if ($queryItems[$i][0] == 'company_name') {
                    // Get company
                    $company = Company::where('name', $queryItems[$i][1], $queryItems[$i][2])->first();

                    // Check company
                    if ($company !== null) {
                        $queryItems[$i][0] = 'company_id';
                        $queryItems[$i][1] = '=';
                        $queryItems[$i][2] = $company->id;
                    }
                }
            }
            // Get the job
            $jobs = RegJob::where($queryItems)->paginate(10);
            $jobsData = [];

            // Check skills
            $skills = $request->input('skills');
            if (isset($skills)) {
                $skills = explode(",", trim($skills, '[]'));
                if (sizeof($skills) >= 1 && $skills[0] !== "") {
                    foreach ($jobs->items() as $job) {
                        foreach ($job->skills as $skill) {
                            if (in_array($skill->name, $skills)) {
                                array_push($jobsData, $job);
                            }
                        };
                    }
                } else {
                    $jobsData = $jobs->items();
                }
            } else {
                $jobsData = $jobs->items();
            }
        }

        // Custom Response
        return response()->json([
            'jobs' => new RegJobCollection($jobsData),
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
    public function AcceptIndividual(AcceptIndividualRequest $request, RegJob $regJob)
    {
        // Validate request
        $validated = $request->validated();
        $job_competetor = RegJobCompetetor::where('id', $validated['reg_job_competetor_id'])->first();

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
        if (!$policy->AcceptIndividual(User::find($user->id), $regJob, $job_competetor)) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }
        $regJob->update(['accepted_individual' => $job_competetor->individual_id]);
        $user2_id = $regJob->acceptedIndividual->user->id;

        Chat::create([
            'user1_id' => $user->id,
            'user2_id' => $user2_id
        ]);
        $DefJob = $regJob->defJob;
        $DefJob->is_done = true;

        // Response
        return response()->json([
            "messsage" => "User accepted successfully"
        ], 200);
    }
}
