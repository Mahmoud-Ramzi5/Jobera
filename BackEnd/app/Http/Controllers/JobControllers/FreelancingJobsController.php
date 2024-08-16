<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\TransactionsController;
use App\Models\User;
use App\Models\Individual;
use App\Models\Company;
use App\Models\Chat;
use App\Models\DefJob;
use App\Models\FreelancingJob;
use App\Models\FreelancingJobCompetitor;
use App\Filters\JobFilter;
use App\Policies\FreelancingJobPolicy;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\AddFreelancingJobRequest;
use App\Http\Requests\ApplyFreelancingJobRequest;
use App\Http\Requests\AcceptUserRequest;
use App\Http\Resources\FreelancingJobResource;
use App\Http\Resources\FreelancingJobCollection;
use App\Http\Resources\FreelancingJobCompetitorResource;
use App\Http\Resources\FreelancingJobCompetitorCollection;


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

        // Check policy
        $policy = new FreelancingJobPolicy();

        if (!$policy->PostFreelancingJob(User::find($user->id))) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        // Check if Remotely
        if ($validated['state_id'] == 0) {
            $validated = Arr::except($validated, 'state_id');
        }

        // Create DefJob
        $validated['is_done'] = false;
        $defJob = DefJob::create($validated);
        $defJob->skills()->attach($validated['skills']);

        // Check DefJob
        if ($defJob == null) {
            return response()->json([
                'errors' => ['job' => 'Could not create job']
            ], 400);
        }

        // Handle photo file
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $path = $file->storeAs($user->id . '/FreelancingJob-' . $defJob->id, $file->getClientOriginalName());
            $defJob->photo = $path;
            $defJob->save();
        }

        // Create Freelancingjob
        $validated['user_id'] = $user->id;
        $validated['defJob_id'] = $defJob->id;
        $Freelancingjob = FreelancingJob::create($validated);

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
            // Check skills
            $skills = $request->input('skills');
            if (isset($skills)) {
                $skills = explode(",", trim($skills, '[]'));
                if (sizeof($skills) >= 1 && $skills[0] != "") {
                    // Get jobs
                    $jobs = FreelancingJob::where($queryItems)->with('defJob')
                        ->wherehas('defJob', function ($query) {
                            $query->where('is_done', false);
                        })->with('defJob.skills')
                        ->wherehas('defJob.skills', function ($query) use ($skills) {
                            $query->whereIn('name', $skills);
                        })->orderByDesc('created_at')->paginate(10);
                } else {
                    // Get jobs
                    $jobs = FreelancingJob::where($queryItems)->with('defJob')
                        ->wherehas('defJob', function ($query) {
                            $query->where('is_done', false);
                        })->orderByDesc('created_at')->paginate(10);
                }
            } else {
                // Get jobs
                $jobs = FreelancingJob::where($queryItems)->with('defJob')
                    ->wherehas('defJob', function ($query) {
                        $query->where('is_done', false);
                    })->orderByDesc('created_at')->paginate(10);
            }
        } else {
            // Check if job filtered based on the user that posted the job
            for ($i = 0; $i < count($queryItems); $i++) {
                if ($queryItems[$i][0] == 'user_name') {
                    // Get user
                    $company = Company::where('name', $queryItems[$i][1], $queryItems[$i][2])->first();
                    $individual = Individual::where('full_name', $queryItems[$i][1], $queryItems[$i][2])->first();

                    // Check user
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

            // Check skills
            $skills = $request->input('skills');
            if (isset($skills)) {
                $skills = explode(",", trim($skills, '[]'));
                if (sizeof($skills) >= 1 && $skills[0] != "") {
                    // Get jobs
                    $jobs = FreelancingJob::where($queryItems)->with('defJob')
                        ->wherehas('defJob', function ($query) {
                            $query->where('is_done', false);
                        })->with('defJob.skills')
                        ->wherehas('defJob.skills', function ($query) use ($skills) {
                            $query->whereIn('name', $skills);
                        })->orderByDesc('created_at')->paginate(10);
                } else {
                    // Get jobs
                    $jobs = FreelancingJob::where($queryItems)->with('defJob')
                        ->wherehas('defJob', function ($query) {
                            $query->where('is_done', false);
                        })->orderByDesc('created_at')->paginate(10);
                }
            } else {
                // Get jobs
                $jobs = FreelancingJob::where($queryItems)->with('defJob')
                    ->wherehas('defJob', function ($query) {
                        $query->where('is_done', false);
                    })->orderByDesc('created_at')->paginate(10);
            }
        }

        // Custom Response
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

    public function ShowFreelancingJob(Request $request, $defJob_id)
    {
        // Get freelancingJob
        $freelancingJob = FreelancingJob::where('defJob_id', $defJob_id)->first();

        // Check freelancingJob
        if ($freelancingJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Response
        return response()->json([
            'job' => new FreelancingJobResource($freelancingJob),
        ], 200);
    }

    public function ViewFreelancingJobCompetitors(Request $request, $defJob_id)
    {
        // Get freelancingJob
        $freelancingJob = FreelancingJob::where('defJob_id', $defJob_id)->first();

        // Check freelancingJob
        if ($freelancingJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Response
        return response()->json([
            'job_competitors' => new FreelancingJobCompetitorCollection($freelancingJob->competitors),
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

        // Get freelancingJob
        $freelancingJob = FreelancingJob::where('defJob_id', $validated['job_id'])->first();

        // Check freelancingJob
        if ($freelancingJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Check policy
        $policy = new FreelancingJobPolicy();

        if (!$policy->ApplyFreelancingJob(User::find($user->id))) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        // Create FreelancingJobCompetitor
        $validated['user_id'] = $user->id;
        $validated['job_id'] = $freelancingJob->id;
        $FreelancingJobCompetitor = FreelancingJobCompetitor::create($validated);

        // Response
        return response()->json([
            'job_competitor' => new FreelancingJobCompetitorResource($FreelancingJobCompetitor),
        ], 200);
    }

    public function DeleteFreelancingJob(Request $request, $defJob_id)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get freelancingJob
        $freelancingJob = FreelancingJob::where('defJob_id', $defJob_id)->first();

        // Check freelancingJob
        if ($freelancingJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
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
        $freelancingJob->defJob->delete();

        // Response
        return response()->json([
            "message" => "Job has been deleted successfully"
        ], 204);
    }

    public function AcceptUser(AcceptUserRequest $request, $defJob_id)
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

        // Get freelancingJob
        $freelancingJob = FreelancingJob::where('defJob_id', $defJob_id)->first();

        // Check freelancingJob
        if ($freelancingJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Get competitor
        $job_competitor = FreelancingJobCompetitor::where('id', $validated['freelancing_job_competitor_id'])->first();

        // Check competitor
        if ($job_competitor == null) {
            return response()->json([
                'errors' => ['job_competitor' => 'Invalid job_competitor']
            ], 401);
        }
        //Check for different offers
        if ($validated['offer'] != $job_competitor->offer) {
            return response()->json([
                'errors' => ['error' => 'please refresh the competitor changed his offer']
            ], 401);
        }

        // Check policy
        $policy = new FreelancingJobPolicy();
        if (!$policy->AcceptUser(User::find($user->id), $freelancingJob, $job_competitor)) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        // Update freelancingJob
        $freelancingJob->accepted_user = $job_competitor->user_id;
        $freelancingJob->save();

        // Get Other user
        $other_user = $job_competitor;

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

        $something = app(TransactionsController::class)->FreelancingJobTransaction($user->id, $freelancingJob->defJob_id, $validated['offer']);

        // Response
        return response()->json([
            "messsage" => $something
        ], 200);
    }

    public function FinishedJob(Request $request, $defJob_id)
    {
        $validated = $request->validate([
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'amount' => 'required'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get freelancingJob
        $freelancingJob = FreelancingJob::where('defJob_id', $defJob_id)->first();

        // Check freelancingJob
        if ($freelancingJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Check policy
        $policy = new FreelancingJobPolicy();
        if (!$policy->FinishedJob(User::find($validated['receiver_id']), $freelancingJob)) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized']
            ], 401);
        }

        // Set is_done to true
        $freelancingJob->defJob->is_done = true;
        $freelancingJob->defJob->save();

        $something = app(TransactionsController::class)->AddUserTransaction($validated['sender_id'], $validated['receiver_id'], $freelancingJob->defJob_id, $validated['amount']);

        // Response
        return response()->json([
            "message" => $something
        ], 200);
    }

    public function ChangeOffer(Request $request)
    {
        $validated = $request->validate([
            'defJob_id' => 'required',
            'offer' => 'required',
        ]);
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get freelancingJob
        $freelancingJob = FreelancingJob::where('defJob_id', $validated['defJob_id'])->first();

        // Check freelancingJob
        if ($freelancingJob == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 404);
        }

        // Get competitor
        $job_competitor = FreelancingJobCompetitor::where('user_id', $user->id)->where('job_id', $freelancingJob->id)->first();

        // Check competitor
        if ($job_competitor == null) {
            return response()->json([
                'errors' => ['job_competitor' => 'Invalid job_competitor']
            ], 401);
        }

        //Check if accepted
        if ($freelancingJob->accepted_user == $user->id) {
            return response()->json([
                'errors' => ['error' => 'cant change offer you are already accepted']
            ], 401);
        }
        $job_competitor->offer = $validated['offer'];
        $job_competitor->save();
        return response()->json([
            'message' => ['offer' => 'offer changed successfully']
        ], 200);
    }
}
