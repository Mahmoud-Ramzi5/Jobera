<?php

namespace App\Http\Controllers\AuthControllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use App\Notifications\EmailVerification;

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
        $token = $user->createToken("api_token")->accessToken;
        $this->SendEmailVerification($request);

        // Response
        return response()->json([
            "message" => "users registered",
            "data" => $user,
            "access_token" => $token,
            "token_type" => "bearer"
        ], 201);
    }

    public function Login(LoginRequest $request) {
        // Validate request
        $validated = $request->validated();
        $remember = $validated['remember'];
        unset($validated['remember']);

        if (!Auth::attempt($validated)) {
            // Invalid email or password
            return response()->json([
                "errors" => "Invalid email or password"
            ], 401);
        }

        // Login user
        $user = User::where("email", $validated['email'])->first();
        $token = $user->createToken("api_token");
        $expiration = $remember ? Carbon::now()->addYear() : Carbon::now()->addDay();
        $token->token->expires_at = $expiration;
        $token->token->save();

         // Response
        return response()->json([
            "data" => $user,
            "access_token" => $token->accessToken,
            "token_type" => "bearer",
            "expires_at" => $expiration,
        ], 200);
    }

    public function Logout(Request $request) {
        $request->user()->token()->delete();
        // Response
        return response()->json([
            "message" => "Logged Out Successfully",
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

        // Response
        return response()->json([
            "message" => "Verification email has been sent"
        ], 200);
    }

    public function VerifyEmail(Request $request) {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => 'Invalid token',
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
            'errors' => 'Email verification failed',
        ], 500);
    }
    public function isExpired(Request $request){
        return response()->json([
            'message' => 'Token is valid'
        ], 201);
    }
}
