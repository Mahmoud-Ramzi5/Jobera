<?php

namespace App\Http\Controllers\JobControllers;

use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\Company;
use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\FreelancingJob;
use App\Models\RegJobCompetitor;
use App\Models\FreelancingJobCompetitor;
use App\Models\BookmarkedJob;
use App\Filters\JobFilter;
use Illuminate\Http\Request;
use App\Http\Resources\RegJobResource;
use App\Http\Resources\RegJobCollection;
use App\Http\Resources\RegJobCompetitorResource;
use App\Http\Resources\FreelancingJobResource;
use App\Http\Resources\FreelancingJobCollection;
use App\Http\Resources\FreelancingJobCompetitorResource;

class DefJobsController extends Controller
{
    public function ShowAllJobs(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get all jobs
        $jobs = [];
        $defJobs = DefJob::where('is_done', false)->orderByDesc('created_at')->paginate(10);
        foreach ($defJobs as $defJob) {
            $regJob = RegJob::where('defJob_id', $defJob->id)->first();
            $freelancingJob = FreelancingJob::where('defJob_id', $defJob->id)->first();
            if ($regJob != null) {
                array_push($jobs, new RegJobResource($regJob));
            } else if ($freelancingJob != null) {
                array_push($jobs, new FreelancingJobResource($freelancingJob));
            } else {
                continue;
            }
        }

        // Response
        return response()->json([
            'jobs' => $jobs,
            'pagination_data' => [
                'from' => $defJobs->firstItem(),
                'to' => $defJobs->lastItem(),
                'per_page' => $defJobs->perPage(),
                'total' => $defJobs->total(),
                'first_page' => 1,
                'current_page' => $defJobs->currentPage(),
                'last_page' => $defJobs->lastPage(),
                'has_more_pages' => $defJobs->hasMorePages(),
                'first_page_url' => $defJobs->url(1),
                'current_page_url' => $defJobs->url($defJobs->currentPage()),
                'last_page_url' => $defJobs->url($defJobs->lastPage()),
                'next_page' => $defJobs->nextPageUrl(),
                'prev_page' => $defJobs->previousPageUrl(),
                'path' => $defJobs->path(),
            ],
        ], 200);
    }

    public function ShowJobsAdmin(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Filter
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);
        if (!empty($queryItems)) {
            // Check Job Type
            $type = $queryItems[0][2];
            if ($type == "Freelancing") {
                $freelancingJobs = FreelancingJob::paginate(10);
                return response()->json([
                    "jobs" => new FreelancingJobCollection($freelancingJobs->items()),
                    'pagination_data' => [
                        'from' => $freelancingJobs->firstItem(),
                        'to' => $freelancingJobs->lastItem(),
                        'total' => $freelancingJobs->total(),
                        'first_page' => 1,
                        'current_page' => $freelancingJobs->currentPage(),
                        'last_page' => $freelancingJobs->lastPage(),
                        'pageNumbers' => $this->generateNumberArray(1, $freelancingJobs->lastPage()),
                        'first_page_url' => $freelancingJobs->url(1),
                        'current_page_url' => $freelancingJobs->url($freelancingJobs->currentPage()),
                        'last_page_url' => $freelancingJobs->url($freelancingJobs->lastPage()),
                        'next_page' => $freelancingJobs->nextPageUrl(),
                        'prev_page' => $freelancingJobs->previousPageUrl(),
                        'path' => $freelancingJobs->path(),
                    ],
                ]);
            } else if ($type == "PartTime") {
                $partTimeJobs = RegJob::where('type', 'PartTime')->paginate(10);
                return response()->json([
                    "jobs" => new RegJobCollection($partTimeJobs->items()),
                    'pagination_data' => [
                        'from' => $partTimeJobs->firstItem(),
                        'to' => $partTimeJobs->lastItem(),
                        'total' => $partTimeJobs->total(),
                        'first_page' => 1,
                        'current_page' => $partTimeJobs->currentPage(),
                        'last_page' => $partTimeJobs->lastPage(),
                        'pageNumbers' => $this->generateNumberArray(1, $partTimeJobs->lastPage()),
                        'has_more_pages' => $partTimeJobs->hasMorePages(),
                        'first_page_url' => $partTimeJobs->url(1),
                        'current_page_url' => $partTimeJobs->url($partTimeJobs->currentPage()),
                        'last_page_url' => $partTimeJobs->url($partTimeJobs->lastPage()),
                        'next_page' => $partTimeJobs->nextPageUrl(),
                        'prev_page' => $partTimeJobs->previousPageUrl(),
                        'path' => $partTimeJobs->path(),
                    ],
                ]);
            } else if ($type == "FullTime") {
                $fullTimeJobs = RegJob::where('type', 'FullTime')->paginate(10);
                return response()->json([
                    "jobs" => new RegJobCollection($fullTimeJobs->items()),
                    'pagination_data' => [
                        'from' => $fullTimeJobs->firstItem(),
                        'to' => $fullTimeJobs->lastItem(),
                        'total' => $fullTimeJobs->total(),
                        'first_page' => 1,
                        'current_page' => $fullTimeJobs->currentPage(),
                        'last_page' => $fullTimeJobs->lastPage(),
                        'pageNumbers' => $this->generateNumberArray(1, $fullTimeJobs->lastPage()),
                        'first_page_url' => $fullTimeJobs->url(1),
                        'current_page_url' => $fullTimeJobs->url($fullTimeJobs->currentPage()),
                        'last_page_url' => $fullTimeJobs->url($fullTimeJobs->lastPage()),
                        'next_page' => $fullTimeJobs->nextPageUrl(),
                        'prev_page' => $fullTimeJobs->previousPageUrl(),
                        'path' => $fullTimeJobs->path(),
                    ],
                ]);
            }
        }
        return response()->json([
            "errors" => ["type"=>"No type selected"],
        ], 400);
    }

    public function ShowSpecificJob(Request $request, $id)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get job
        $defJob = DefJob::find($id);

        // Check job
        if ($defJob == null) {
            return response()->json([
                'errors' => ['job' => 'Job was not found'],
            ], 404);
        }

        $regJob = RegJob::where('defJob_id', $defJob->id)->first();
        $freelancingJob = FreelancingJob::where('defJob_id', $defJob->id)->first();
        if ($regJob != null) {
            $job = new RegJobResource($regJob);
        } else if ($freelancingJob != null) {
            $job = new FreelancingJobResource($freelancingJob);
        } else {
            // Response
            return response()->json([
                'errors' => ['job' => 'Job was not found'],
            ], 404);
        }

        // Response
        return response()->json([
            'job' => $job,
        ], 200);
    }

    public function PostedJobs(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Filter
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);

        // Check company
        $company = Company::where('user_id', $user->id)->first();

        // Initialize jobs
        $jobs = [];
        $jobType = 'RegularJob';

        // Response
        if (!empty($queryItems)) {
            // Check Job Type
            $type = $queryItems[0][2];
            if (isset($type)) {
                if ($company && ($type == 'FullTime' || $type == 'PartTime')) {
                    // Check skills
                    $skills = $request->input('skills');
                    if (isset($skills)) {
                        $skills = explode(",", trim($skills, '[]'));
                        if (sizeof($skills) >= 1 && $skills[0] != "") {
                            // Get jobs
                            $jobs = RegJob::where('company_id', $company->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('defJob.skills', function ($query) use ($skills) {
                                    $query->whereIn('name', $skills);
                                })->orderByDesc('created_at')->paginate(10);
                        } else {
                            // Get jobs
                            $jobs = RegJob::where('company_id', $company->id)->where($queryItems)
                                ->orderByDesc('created_at')->paginate(10);
                        }
                    } else {
                        // Get jobs
                        $jobs = RegJob::where('company_id', $company->id)->where($queryItems)
                            ->orderByDesc('created_at')->paginate(10);
                    }
                } else if ($company && $type == 'RegularJob') {
                    unset($queryItems[0]);
                    // Check skills
                    $skills = $request->input('skills');
                    if (isset($skills)) {
                        $skills = explode(",", trim($skills, '[]'));
                        if (sizeof($skills) >= 1 && $skills[0] != "") {
                            // Get jobs
                            $jobs = RegJob::where('company_id', $company->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('defJob.skills', function ($query) use ($skills) {
                                    $query->whereIn('name', $skills);
                                })->orderByDesc('created_at')->paginate(10);
                        } else {
                            // Get jobs
                            $jobs = RegJob::where('company_id', $company->id)->where($queryItems)
                                ->orderByDesc('created_at')->paginate(10);
                        }
                    } else {
                        // Get jobs
                        $jobs = RegJob::where('company_id', $company->id)->where($queryItems)
                            ->orderByDesc('created_at')->paginate(10);
                    }
                } else {
                    unset($queryItems[0]);
                    $jobType = 'Freelancing';
                    // Check skills
                    $skills = $request->input('skills');
                    if (isset($skills)) {
                        $skills = explode(",", trim($skills, '[]'));
                        if (sizeof($skills) >= 1 && $skills[0] != "") {
                            // Get jobs
                            $jobs = FreelancingJob::where('user_id', $user->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('defJob.skills', function ($query) use ($skills) {
                                    $query->whereIn('name', $skills);
                                })->orderByDesc('created_at')->paginate(10);
                        } else {
                            // Get jobs
                            $jobs = FreelancingJob::where('user_id', $user->id)->where($queryItems)
                                ->orderByDesc('created_at')->paginate(10);
                        }
                    } else {
                        // Get jobs
                        $jobs = FreelancingJob::where('user_id', $user->id)->where($queryItems)
                            ->orderByDesc('created_at')->paginate(10);
                    }
                }
            } else {
                // Response
                return response()->json([
                    'errors' => ['type' => 'Invalid JobType'],
                ], 404);
            }

            // Custom Response
            return response()->json([
                'jobs' => $jobType == 'RegularJob' ? new RegJobCollection($jobs->items())
                    : new FreelancingJobCollection($jobs->items()),
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
                    'path' => $jobs->path(),
                ],
            ], 200);
        } else {
            // Response
            return response()->json([
                'errors' => ['type' => 'Invalid JobType'],
            ], 404);
        }
    }

    public function AppliedJobs(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Filter
        $filter = new JobFilter();
        $queryItems = $filter->transform($request);

        // Check Individual
        $individual = Individual::where('user_id', $user->id)->first();
        if ($individual == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Initialize jobs
        $jobs = [];
        $jobsData = [];
        $competitors = [];
        $jobType = 'RegularJob';

        // Response
        if (!empty($queryItems)) {
            // Check Job Type
            $type = $queryItems[0][2];
            if (isset($type)) {
                if ($individual && ($type == 'FullTime' || $type == 'PartTime')) {
                    // Check skills
                    $skills = $request->input('skills');
                    if (isset($skills)) {
                        $skills = explode(",", trim($skills, '[]'));
                        if (sizeof($skills) >= 1 && $skills[0] != "") {
                            // Get jobs
                            $jobs = RegJob::where('accepted_individual', $individual->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('competitors', function ($query) use ($individual) {
                                    $query->where('individual_id', $individual->id);
                                })->wherehas('defJob.skills', function ($query) use ($skills) {
                                    $query->whereIn('name', $skills);
                                })->orderByDesc('created_at')->paginate(10);
                        } else {
                            // Get jobs
                            $jobs = RegJob::where('accepted_individual', $individual->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('competitors', function ($query) use ($individual) {
                                    $query->where('individual_id', $individual->id);
                                })->orderByDesc('created_at')->paginate(10);
                        }
                    } else {
                        // Get jobs
                        $jobs = RegJob::where('accepted_individual', $individual->id)
                            ->where($queryItems)->with('defJob.skills')
                            ->wherehas('competitors', function ($query) use ($individual) {
                                $query->where('individual_id', $individual->id);
                            })->orderByDesc('created_at')->paginate(10);
                    }
                } else if ($individual && $type == 'RegularJob') {
                    unset($queryItems[0]);
                    // Check skills
                    $skills = $request->input('skills');
                    if (isset($skills)) {
                        $skills = explode(",", trim($skills, '[]'));
                        if (sizeof($skills) >= 1 && $skills[0] != "") {
                            // Get jobs
                            $jobs = RegJob::where('accepted_individual', $individual->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('competitors', function ($query) use ($individual) {
                                    $query->where('individual_id', $individual->id);
                                })->wherehas('defJob.skills', function ($query) use ($skills) {
                                    $query->whereIn('name', $skills);
                                })->orderByDesc('created_at')->paginate(10);
                        } else {
                            // Get jobs
                            $jobs = RegJob::where('accepted_individual', $individual->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('competitors', function ($query) use ($individual) {
                                    $query->where('individual_id', $individual->id);
                                })->orderByDesc('created_at')->paginate(10);
                        }
                    } else {
                        // Get jobs
                        $jobs = RegJob::where('accepted_individual', $individual->id)
                            ->where($queryItems)->with('defJob.skills')
                            ->wherehas('competitors', function ($query) use ($individual) {
                                $query->where('individual_id', $individual->id);
                            })->orderByDesc('created_at')->paginate(10);
                    }
                } else {
                    unset($queryItems[0]);
                    $jobType = 'Freelancing';
                    // Check skills
                    $skills = $request->input('skills');
                    if (isset($skills)) {
                        $skills = explode(",", trim($skills, '[]'));
                        if (sizeof($skills) >= 1 && $skills[0] != "") {
                            // Get jobs
                            $jobs = FreelancingJob::where('accepted_user', $user->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('competitors', function ($query) use ($user) {
                                    $query->where('user_id', $user->id);
                                })->wherehas('defJob.skills', function ($query) use ($skills) {
                                    $query->whereIn('name', $skills);
                                })->orderByDesc('created_at')->paginate(10);
                        } else {
                            // Get jobs
                            $jobs = FreelancingJob::where('accepted_user', $user->id)
                                ->where($queryItems)->with('defJob.skills')
                                ->wherehas('competitors', function ($query) use ($user) {
                                    $query->where('user_id', $user->id);
                                })->orderByDesc('created_at')->paginate(10);
                        }
                    } else {
                        // Get jobs
                        $jobs = FreelancingJob::where('accepted_user', $user->id)
                            ->where($queryItems)->with('defJob.skills')
                            ->wherehas('competitors', function ($query) use ($user) {
                                $query->where('user_id', $user->id);
                            })->orderByDesc('created_at')->paginate(10);
                    }
                }
            } else {
                // Response
                return response()->json([
                    'errors' => ['type' => 'Invalid JobType'],
                ], 404);
            }

            if ($jobType == 'RegularJob') {
                foreach ($jobs->items() as $job) {
                    $competitor = RegJobCompetitor::where('job_id', $job->id)
                        ->where('individual_id', $individual->id)->first();
                    if ($job->accepted_individual != null) {
                        if ($job->accepted_individual == $individual->id) {
                            array_push($jobsData, [
                                "user_offer" => new RegJobCompetitorResource($competitor),
                                "job_data" => [
                                    "defJob_id" => $job->defJob_id,
                                    "title" => $job->defJob->title,
                                    "photo" => $job->defJob->photo,
                                    "status" => "Accepted",
                                ],
                            ]);
                        } else {
                            array_push($jobsData, [
                                "user_offer" => new RegJobCompetitorResource($competitor),
                                "job_data" => [
                                    "defJob_id" => $job->defJob_id,
                                    "title" => $job->defJob->title,
                                    "photo" => $job->defJob->photo,
                                    "status" => "Refused",
                                ],
                            ]);
                        }
                    } else {
                        array_push($jobsData, [
                            "user_offer" => new RegJobCompetitorResource($competitor),
                            "job_data" => [
                                "defJob_id" => $job->defJob_id,
                                "title" => $job->defJob->title,
                                "photo" => $job->defJob->photo,
                                "status" => "Pending",
                            ],
                        ]);
                    }
                }
            } else {
                foreach ($jobs->items() as $job) {
                    $competitor = FreelancingJobCompetitor::where('job_id', $job->id)
                        ->where('user_id', $user->id)->first();

                    if ($job->accepted_user != null) {
                        if ($job->accepted_user == $user->id) {
                            array_push($jobsData, [
                                "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                "job_data" => [
                                    "defJob_id" => $job->defJob_id,
                                    "title" => $job->defJob->title,
                                    "photo" => $job->defJob->photo,
                                    "status" => "Accepted",
                                ],
                            ]);
                        } else {
                            array_push($jobsData, [
                                "user_offer" => new FreelancingJobCompetitorResource($competitor),
                                "job_data" => [
                                    "defJob_id" => $job->defJob_id,
                                    "title" => $job->defJob->title,
                                    "photo" => $job->defJob->photo,
                                    "status" => "Refused",
                                ],
                            ]);
                        }
                    } else {
                        array_push($jobsData, [
                            "user_offer" => new FreelancingJobCompetitorResource($competitor),
                            "job_data" => [
                                "defJob_id" => $job->defJob_id,
                                "title" => $job->defJob->title,
                                "photo" => $job->defJob->photo,
                                "status" => "Pending",
                            ],
                        ]);
                    }
                }
            }
            // Custom Response
            return response()->json([
                'jobs' => $jobsData,
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
                    'path' => $jobs->path(),
                ],
            ], 200);
        } else {
            // Response
            return response()->json([
                'errors' => ['type' => 'Invalid JobType'],
            ], 404);
        }
    }

    public function BookmarkedJobs()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get flagged jobs
        $jobs = [];
        $bookmarkedJobs = BookmarkedJob::where('user_id', $user->id)
            ->orderByDesc('created_at')->paginate(10);
        foreach ($bookmarkedJobs as $job) {
            $regJob = RegJob::where('defJob_id', $job->defJob_id)->first();
            $freelancingJob = FreelancingJob::where('defJob_id', $job->defJob_id)->first();
            if ($regJob != null) {
                array_push($jobs, new RegJobResource($regJob));
            } else if ($freelancingJob != null) {
                array_push($jobs, new FreelancingJobResource($freelancingJob));
            } else {
                continue;
            }
        }

        // Custom Response
        return response()->json([
            'jobs' => $jobs,
            'pagination_data' => [
                'from' => $bookmarkedJobs->firstItem(),
                'to' => $bookmarkedJobs->lastItem(),
                'per_page' => $bookmarkedJobs->perPage(),
                'total' => $bookmarkedJobs->total(),
                'first_page' => 1,
                'current_page' => $bookmarkedJobs->currentPage(),
                'last_page' => $bookmarkedJobs->lastPage(),
                'has_more_pages' => $bookmarkedJobs->hasMorePages(),
                'first_page_url' => $bookmarkedJobs->url(1),
                'current_page_url' => $bookmarkedJobs->url($bookmarkedJobs->currentPage()),
                'last_page_url' => $bookmarkedJobs->url($bookmarkedJobs->lastPage()),
                'next_page' => $bookmarkedJobs->nextPageUrl(),
                'prev_page' => $bookmarkedJobs->previousPageUrl(),
                'path' => $bookmarkedJobs->path(),
            ],
        ], 200);
    }

    public function BookmarkJob(Request $request, $id)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Get job
        $defJob = DefJob::find($id);

        // Check job
        if ($defJob == null) {
            return response()->json([
                'errors' => ['job' => 'Job was not found'],
            ], 404);
        }

        // Get flagged jobs
        $bookmarkedJobs = $user->bookmarkedJobs()->pluck('defJob_id')->toArray();

        // Check if job is already flagged
        if (in_array($defJob->id, $bookmarkedJobs)) {
            $user->bookmarkedJobs()->detach($defJob->id);

            // Response
            return response()->json([
                "is_flagged" => false,
            ], 200);
        } else {
            $user->bookmarkedJobs()->attach($defJob->id);

            // Response
            return response()->json([
                "is_flagged" => true,
            ], 200);
        }
    }
    public function generateNumberArray($start, $end)
    {
        $numbers = range($start, $end);
        return $numbers;
    }
}
