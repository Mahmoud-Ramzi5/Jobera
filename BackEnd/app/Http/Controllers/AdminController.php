<?php

namespace App\Http\Controllers;

use App\Http\Controllers\JobControllers\JobFeedController;
use App\Models\User;
use App\Models\DefJob;
use App\Models\Company;
use App\Models\Individual;
use App\Models\RedeemCode;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Policies\AdminPolicy;
use App\Http\Resources\CompanyCollection;
use App\Http\Resources\IndividualCollection;
use App\Http\Resources\TransactionCollection;

class AdminController extends Controller
{
    public function GenerateCode(Request $request)
    {
        $validated = $request->validate([
            'value' => 'required|numeric|min:0',
        ]);

        // Get user
        $user = auth()->user();

        $policy = new AdminPolicy();

        if (!$policy->Policy(User::find($user->id))) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        } else {
            $code = substr(uniqid(), 0, 16);
            $check = RedeemCode::where('code', $code)->first();
            if ($check === null) {
                $redeemCode = RedeemCode::create([
                    'code' => $code,
                    'value' => $validated['value'],
                    'wallet_id' => null,
                ]);
                return response()->json([
                    'message' => 'created succcessfully',
                ], 201);
            } else {
                return response()->json([
                    'message' => 'an error accured please try again',
                ]);
            }
        }
    }
    public function Users()
    {
         // Get user
         $user = auth()->user();

         // Check user
         if ($user == null) {
             return response()->json([
                 'errors' => ['user' => 'Invalid user'],
             ], 401);
         }
         // Check policy
         $policy = new AdminPolicy();
 
         if (!$policy->Policy(User::find($user->id))) {
             // Response
             return response()->json([
                 'errors' => ['user' => 'Unauthorized'],
             ], 401);
         }
        $individuals = Individual::all();
        $companies = Company::all();
        return response()->json([
            "individual" => new IndividualCollection($individuals),
            "company" => new CompanyCollection($companies),
        ]);
    }
    public function GetAllTransactions()
    {
         // Get user
         $user = auth()->user();

         // Check user
         if ($user == null) {
             return response()->json([
                 'errors' => ['user' => 'Invalid user'],
             ], 401);
         }
         // Check policy
         $policy = new AdminPolicy();
 
         if (!$policy->Policy(User::find($user->id))) {
             // Response
             return response()->json([
                 'errors' => ['user' => 'Unauthorized'],
             ], 401);
         }
        $transactions = Transaction::all();
        return response()->json([
            'transactions' => new TransactionCollection($transactions),
        ]);
    }
    public function ReportsData()
    {
         // Get user
         $user = auth()->user();

         // Check user
         if ($user == null) {
             return response()->json([
                 'errors' => ['user' => 'Invalid user'],
             ], 401);
         }
         // Check policy
         $policy = new AdminPolicy();
 
         if (!$policy->Policy(User::find($user->id))) {
             // Response
             return response()->json([
                 'errors' => ['user' => 'Unauthorized'],
             ], 401);
         }

        $jobs = DefJob::with('state')->with('bookmarkedBy')->get();
        $countryCounts = [];
        $bookmarkedJobs=[];

        foreach ($jobs as $job) {
            foreach ($job->bookmarkedBy as $user) {
                if (array_key_exists($job->id, $bookmarkedJobs)) {
                    $bookmarkedJobs[$job->title]++;
                } else {
                    $bookmarkedJobs[$job->title] = 1;
                }
            }
            if($job->state==null){
                if (array_key_exists("Remotly", $countryCounts)) {
                    $countryCounts["Remotly"]++;
                } else {
                    $countryCounts["Remotly"] = 1;
                }
                continue;
            }
            $countryName = $job->state->country->country_name;

            if (array_key_exists($countryName, $countryCounts)) {
                $countryCounts[$countryName]++;
            } else {
                $countryCounts[$countryName] = 1;
            }
        }
        arsort($countryCounts);
        $users = User::with('reviewedBy')->get();
        $userReviews = [];

        foreach ($users as $user) {
            $company=Company::where('user_id',$user->id)->first();
            $individual=Individual::where('user_id',$user->id)->first();
            if($company!=null){
                $userReviews[$user->id]['user_name'] = $company->name;
            }elseif($individual!=null){
                $userReviews[$user->id]['user_name'] = $individual->full_name;
            }
            else{
                continue;
            }
            
            $userReviews[$user->id]['rating'] = $user->reviewedBy->pluck('review')->sum() ?? 0;
        }
        usort($userReviews, function ($a, $b) {
            return $b['rating'] - $a['rating'];
        });


        $jobFeedController = new JobFeedController();
        return response()->json([
            "Most Countries"=>$countryCounts,
            "Most Skills"=>$jobFeedController->MostNeededSkills(true),
            "Most Bookmarked"=>$bookmarkedJobs,
            "Top Rated Users"=>$userReviews
        ]);

    }
}
