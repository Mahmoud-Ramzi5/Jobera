<?php

namespace App\Http\Controllers\AuthControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Notifications\EmailVerification;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function Register(RegisterRequest $request) {
        // Validate request
        $validated = $request->validated();

        // Hash password and remove confirm password
        $validated['password'] = bcrypt($validated['password']);
        $validated = Arr::except($validated, 'confirmPassword');

        // Register user and send verification email
        $user = User::create($validated);
        $this->SendEmailVerification($request);

        // Response
        return response()->json([
            "message" => "users registered",
            "data" => $user,
            "token" => $user->createToken("api_token")->accessToken,
        ], 201);
    }

    public function Login(LoginRequest $request) {
        // Validate request
        $validated = $request->validated();

        // Check user
        if(! Auth::attempt($validated)) {
            return response()->json([
                "error" => "invalid email or password"
            ], 401);
        }

        // Login user
        $user = User::where("email", $validated['email'])->first();
        $token = $user->createToken("api_token")->accessToken;

        // Response
        return response()->json([
            "data" => $user,
            "access_token" => $token,
            "token_type" => "bearer"
        ], 200);
    }

    public function SendEmailVerification(Request $request) {
        // Validate request
        $request->validate([
            'email' => 'required|email',
        ]);

        // Get user
        $user = User::where("email", $request->email)->first();

        // Create Token
        $token = $user->createToken('auth-token')->accessToken;

        // Send Token
        $user->notify(new EmailVerification($token));

        //
        return response()->json([
            "message" => "Verification email has been sent"
        ]);
    }

    public function VerifyEmail(Request $request) {
        // Validate request
        $request->validate([
            'token' => 'required'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'error' => 'Invalid token',
            ], 404);
        }

        // check verification
        if ($user->email_verified_at || $user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified',
            ], 200);
        }

        // Verify email
        if ($user->markEmailAsVerified()) {
            return response()->json([
                'message' => 'Email verified successfully',
            ], 200);
        }

        return response()->json([
            'error' => 'Email verification failed',
        ], 500);
    }
}
