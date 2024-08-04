<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use App\Models\Individual;
use App\Models\RedeemCode;
use Illuminate\Http\Request;
use App\Http\Resources\CompanyCollection;
use App\Http\Resources\IndividualCollection;

class AdminController extends Controller
{
    public function GenerateCode(Request $request)
    {
        $validated = $request->validate([
            'value' => 'required|numeric'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        $adminUser = User::find(1);
        if ($user !== $adminUser) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        } else {
            $code = substr(uniqid(), 0, 16);
            $check = RedeemCode::where('code', $code)->first();
            if ($check === null) {
                $redeemCode = RedeemCode::create([
                    'code' => $code,
                    'value' => $validated['value'],
                    'user_id' => null
                ]);
                return response()->json([
                    'message' => 'created succcessfully'
                ], 201);
            } else {
                return response()->json([
                    'message' => 'an error accured please try again'
                ]);
            }
        }
    }
    public function Users()
    {
        $individuals=Individual::all();
        $companies=Company::all();
        return response()->json([
            "individual"=>new IndividualCollection($individuals),
            "company"=>new CompanyCollection($companies)
        ]);
    }
}
