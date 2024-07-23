<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\RedeemCode;
use Illuminate\Http\Request;

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
        } else
        {
            $code = substr(uniqid(), 0, 16);
            $check = RedeemCode::where('code', $code)->first();
            if ($check === null) {
                $redeemCode = RedeemCode::create([
                    'code'=>$code,
                    'value'=>$validated['value']
                ]);
                return response()->json([
                    'message' => 'created succcessfully'
                ], 201);
            } else {
                return response()->json(['message' => 'an error accured please try again']);
            }
        }
    }
}
