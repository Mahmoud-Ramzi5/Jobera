<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\TransactionsController;
use App\Models\User;
use App\Models\Individual;
use App\Models\Company;
use App\Models\Chat;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\RegJobCompetitor;
use App\Filters\JobFilter;
use App\Policies\RegJobPolicy;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\AddRegJobRequest;
use App\Http\Requests\ApplyRegJobRequest;
use App\Http\Requests\AcceptIndividualRequest;
use App\Http\Resources\RegJobResource;
use App\Http\Resources\RegJobCollection;
use App\Http\Resources\RegJobCompetitorResource;
use App\Http\Resources\RegJobCompetitorCollection;


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

        // Check if Remotely
        if ($validated['state_id'] == 0) {
            $validated = Arr::except($validated, 'state_id');
        }

        $job = DefJob::create($validated);
        // Handle photo file
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $path = $file->storeAs($user->id . '/' . $validated['type'] . 'Job-' . $job->id, $file->getClientOriginalName());
            $job->photo = $path;
            $job->save();
        }
        $validated['defJob_id'] = $job->id;
        $Regjob = RegJob::create($validated);
        $Regjob->skills()->attach($validated['skills']);

        if ($validated['salary'] > 0 && $validated['salary'] <= 2000) {
            $adminShare = $validated['salary'] * 0.15;
        } else if ($validated['salary'] > 2000 && $validated['salary'] <= 15000) {
            $adminShare = $validated['salary'] * 0.12;
        } else if ($validated['salary'] > 15000) {
            $adminShare = $validated['salary'] * 0.10;
        } else {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }
        $something = app(TransactionsController::class)->RegJobTransaction($user->id, $Regjob->job_id, $adminShare);

        // Response
        return response()->json([
            "message" => "Job created successfully",
            "job" => $something
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
            $jobsData = [];
            foreach ($jobs->items() as $job) {
                if (!in_array($job, $jobsData) && $job->defJob->is_done == false) {
                    array_push($jobsData, $job);
                } else {
                    continue;
                }
            }
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

            // Get jobs
            $jobs = RegJob::where($queryItems)->paginate(10);
            $jobsData = [];

            // Check skills
            $skills = $request->input('skills');
            if (isset($skills)) {
                $skills = explode(",", trim($skills, '[]'));
                if (sizeof($skills) >= 1 && $skills[0] !== "") {
                    foreach ($jobs->items() as $job) {
                        foreach ($job->skills as $skill) {
                            if (
                                in_array($skill->name, $skills) && !in_array($job, $jobsData)
                                && $job->defJob->is_done == false
                            ) {
                                array_push($jobsData, $job);
                            }
                        }
                        ;
                    }
                } else {
                    foreach ($jobs->items() as $job) {
                        if (!in_array($job, $jobsData) && $job->defJob->is_done == false) {
                            array_push($jobsData, $job);
                        } else {
                            continue;
                        }
                    }
                }
            } else {
                foreach ($jobs->items() as $job) {
                    if (!in_array($job, $jobsData) && $job->defJob->is_done == false) {
                        array_push($jobsData, $job);
                    } else {
                        continue;
                    }
                }
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

    public function ShowRegJob(Request $request, $defJob_id)
    {
        // Get regJob
        $regJob = RegJob::where('defJob_id', $defJob_id)->first();

        // Check regJob
        if ($regJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Response
        return response()->json([
            'job' => new RegJobResource($regJob),
        ], 200);
    }

    public function ViewRegJobCompetitors(Request $request, $defJob_id)
    {
        // Get regJob
        $regJob = RegJob::where('defJob_id', $defJob_id)->first();

        // Check regJob
        if ($regJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Response
        return response()->json([
            'job_competitors' => new RegJobCompetitorCollection($regJob->competitors),
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

        // Get regJob
        $regJob = RegJob::where('defJob_id', $validated['job_id'])->first();

        // Check regJob
        if ($regJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Check policy
        $policy = new RegJobPolicy();

        if (!$policy->ApplyRegJob(User::find($user->id))) {
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        $validated['job_id'] = $regJob->id;
        $validated['individual_id'] = $individual->id;
        $RegJobCompetitor = RegJobCompetitor::create($validated);

        // Response
        return response()->json([
            'job_competitor' => new RegJobCompetitorResource($RegJobCompetitor)
        ], 200);
    }

    public function DeleteRegJob(Request $request, $defJob_id)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get regJob
        $regJob = RegJob::where('defJob_id', $defJob_id)->first();

        // Check regJob
        if ($regJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
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

    public function AcceptIndividual(AcceptIndividualRequest $request, $defJob_id)
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

        // Get regJob
        $regJob = RegJob::where('defJob_id', $defJob_id)->first();

        // Check regJob
        if ($regJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Get competitor
        $job_competitor = RegJobCompetitor::where('id', $validated['reg_job_competitor_id'])->first();

        // Check competitor
        if ($job_competitor == null) {
            return response()->json([
                'errors' => ['job_competitor' => 'Invalid job_competitor']
            ], 401);
        }

        // Check policy
        $policy = new RegJobPolicy();
        if (!$policy->AcceptIndividual(User::find($user->id), $regJob, $job_competitor)) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        // Update regJob
        $regJob->accepted_individual = $job_competitor->individual_id;
        $regJob->defJob->is_done = true;
        $regJob->defJob->save();
        $regJob->save();

        // Get Other user
        $other_user = $job_competitor->individual;

        // Get chat
        $chat = Chat::where(function ($query) use ($user, $other_user) {
            $query->where('user1_id', $user->id)
                ->where('user2_id', $other_user->user_id);
        })->orWhere(function ($query) use ($user, $other_user) {
            $query->where('user1_id', $other_user->user_id)
                ->where('user2_id', $user->id);
        })->first();

        // Check chat
        if ($chat == null) {
            Chat::create([
                'user1_id' => $user->id,
                'user2_id' => $other_user->user_id
            ]);
        }

        // Response
        return response()->json([
            "messsage" => "User accepted successfully"
        ], 200);
    }
}
