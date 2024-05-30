<?php

namespace App\Http\Controllers\AuthControllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\ResetPassword;
use App\Http\Requests\ForgetPasswordRequest;

class ForgetPasswordController extends Controller
{
    public function ForgotPassword(Request $request) {
        // Validate request
        $request->validate([
            'email' => 'required|email',
        ]);

        // Get User
        $user = User::where("email", $request->email)->first();

        // Check user
        if($user == null){
            return response()->json([
                "error" => "email was not found"
            ], 404);
        }

        // Create Token and notify user
        $token = $user->createToken('auth-token')->accessToken;
        $user->notify(new ResetPassword($token));

        // Response
        return response()->json([
            "message" => "reset password has been sent"
        ], 200);
    }

    public function Reset(ForgetPasswordRequest $request) {
        // Validate request
        $validated = $request->validated();

        // Get user
        $user = User::where("email", $validated['email'])->first();

        // Update user
        $validated['password'] = bcrypt($validated['password']);
        $user->update($validated);
        $token = $user->createToken("api_token")->accessToken;

        // Response
        return response()->json([
            "data" => $user,
            "access_token" => $token,
            "token_type" => "bearer"
        ], 200);
    }
}
