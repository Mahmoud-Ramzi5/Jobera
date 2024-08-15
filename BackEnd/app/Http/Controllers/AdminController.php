<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Individual;
use App\Models\Company;
use App\Models\DefJob;
use App\Models\RedeemCode;
use App\Models\Transaction;
use App\Policies\AdminPolicy;
use Illuminate\Http\Request;
use App\Http\Resources\CompanyCollection;
use App\Http\Resources\IndividualCollection;

class AdminController extends Controller
{
    public function GenerateCode(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'value' => 'required|numeric|min:0',
        ]);

        // Get user
        $user = auth()->user();

        // Check policy
        $policy = new AdminPolicy();

        if (!$policy->Policy(User::find($user->id))) {
            // Response
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

                // Response
                return response()->json([
                    'message' => $redeemCode->code,
                ], 201);
            } else {
                // Response
                return response()->json([
                    'errors' => ['error' => 'Email verification failed'],
                ], 400);
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

        // Response
        $individuals = Individual::all();
        $companies = Company::all();
        return response()->json([
            "individual" => new IndividualCollection($individuals),
            "company" => new CompanyCollection($companies),
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

        $jobs = DefJob::with('state')->with('skills')->with('bookmarkedBy')->get();
        $countryCounts = [];
        $skillTypes = [];

        foreach ($jobs as $job) {
            foreach ($job->skills as $skill) {
                if (array_key_exists($skill->type, $skillTypes)) {
                    $skillTypes[$skill->type]++;
                } else {
                    $skillTypes[$skill->type] = 1;
                }
            }
            if ($job->state == null) {
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
        arsort($skillTypes);
        $users = User::with('reviewedBy')->get();
        $userReviews = [];

        foreach ($users as $user) {
            $company = Company::where('user_id', $user->id)->first();
            $individual = Individual::where('user_id', $user->id)->first();
            if ($company != null) {
                $userReviews[$user->id]['name'] = $company->name;
            } elseif ($individual != null) {
                $userReviews[$user->id]['name'] = $individual->full_name;
            } else {
                continue;
            }

            $userReviews[$user->id]['rating'] = $user->reviewedBy->pluck('review')->avg() ?? 0;
        }
        usort($userReviews, function ($a, $b) {
            return $b['rating'] - $a['rating'];
        });
        $lastYearDate = now()->subYear();
        $transactions = Transaction::where('date', '>=', $lastYearDate)->get();

        $monthlyAmounts = [];

        foreach ($transactions as $transaction) {
            $monthYear = $transaction->date->format('Y-m'); // Get the year and month in 'YYYY-MM' format

            if (array_key_exists($monthYear, $monthlyAmounts)) {
                $monthlyAmounts[$monthYear] += $transaction->amount;
            } else {
                $monthlyAmounts[$monthYear] = $transaction->amount;
            }
        }
        ksort($monthlyAmounts);

        $formattedMonthlyAmounts = [];
        foreach ($monthlyAmounts as $month => $amount) {
            $formattedMonthlyAmounts[] = ['month' => $month, 'amount' => $amount];
        }

        $formattedSkillTypes = [];
        foreach ($skillTypes as $key => $value) {
            $formattedSkillTypes[] = [
                "name" => $key,
                "count" => $value,
            ];
        }

        $formattedCountryCounts = [];
        foreach ($countryCounts as $key => $value) {
            $formattedCountryCounts[] = [
                "name" => $key,
                "count" => $value,
            ];
        }
        $topCompanies = array_slice($formattedCountryCounts, 0, 6);
        $topUsers = array_slice($userReviews, 0, 6);
        return response()->json([
            "MostCountries" => $topCompanies,
            "MostSkillTypes" => $formattedSkillTypes,
            "TransactionsByMonth" => $formattedMonthlyAmounts,
            "TopRatedUsers" => $topUsers,
        ]);
    }

    public function DeleteUser(Request $request, $user_id)
    {
        // Get user
        $admin = auth()->user();

        // Check user
        if ($admin == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Check policy
        $policy = new AdminPolicy();

        if (!$policy->Policy(User::find($admin->id))) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Unauthorized'],
            ], 401);
        }
        $user = User::where('id', $user_id)->first();
        $user->delete();
        return response()->json([
            "message" => "The user is deleted"
        ], 204);
    }
}
