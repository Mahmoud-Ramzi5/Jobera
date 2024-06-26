<?php

namespace App\Http\Controllers\AuthControllers;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\Individual;
use App\Models\Company;
use App\Models\Wallet;
use App\Enums\RegisterStep;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\CompanyRegisterRequest;
use App\Http\Resources\IndividualResource;
use App\Http\Resources\CompanyResource;
use App\Notifications\EmailVerification;

class AuthController extends Controller
{
    public function Register(RegisterRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Hash password and remove confirm password
        $validated['password'] = bcrypt($validated['password']);
        $validated = Arr::except($validated, 'confirm_password');

        // Register user and send verification email
        $user = User::create([
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'password' => $validated['password'],
            'state_id' => $validated['state_id'],
        ]);

        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        $validated['user_id'] = $user->id;
        $validated['register_step'] = "SKILLS";
        $individual = Individual::create($validated);

        Wallet::create([
            'id' => $user->id,
            'user_id' => $user->id,
            'current_balance' => 0.0,
            'available_balance' => 0.0,
            'reserved_balance' => 0.0,
        ]);

        $token = $user->createToken("api_token")->accessToken;
        $this->SendEmailVerification($request);

        // Response
        return response()->json([
            "message" => "user registered",
            "individual" => new IndividualResource($individual),
            "access_token" => $token,
            "token_type" => "bearer"
        ], 201);
    }

    public function CompanyRegister(CompanyRegisterRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Hash password and remove confirm password
        $validated['password'] = bcrypt($validated['password']);
        $validated = Arr::except($validated, 'confirm_password');

        // Register user and send verification email
        $user = User::create([
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'password' => $validated['password'],
            'state_id' => $validated['state_id'],
        ]);

        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        $validated['user_id'] = $user->id;
        $company = Company::create($validated);

        Wallet::create([
            'id' => $user->id,
            'user_id' => $user->id,
            'current_balance' => 0.0,
            'available_balance' => 0.0,
            'reserved_balance' => 0.0,
        ]);

        $token = $user->createToken("api_token")->accessToken;
        $this->SendEmailVerification($request);

        // Response
        return response()->json([
            "message" => "company registered",
            "company" => new CompanyResource($company),
            "access_token" => $token,
            "token_type" => "bearer"
        ], 201);
    }

    public function Login(LoginRequest $request)
    {
        // Validate request
        $validated = $request->validated();
        $remember = $validated['remember'];
        unset($validated['remember']);

        if (!Auth::attempt($validated)) {
            // Invalid email or password
            return response()->json([
                'errors' => ['data' => 'Invalid email or password']
            ], 401);
        }

        // Login user
        $user = User::where("email", $validated['email'])->first();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Prepare token
        $token = $user->createToken("api_token");
        $expiration = $remember ? Carbon::now()->addYear() : Carbon::now()->addDay();
        $token->token->expires_at = $expiration;
        $token->token->save();

        // Check individual
        $individual = Individual::where('user_id', $user->id)->first();
        if ($individual != null) {
            // Response
            return response()->json([
                "user" => new IndividualResource($individual),
                "access_token" => $token->accessToken,
                "token_type" => "bearer",
                "expires_at" => $expiration,
            ], 200);
        }

        // Check company
        $company = Company::where('user_id', $user->id)->first();
        if ($company != null) {
            // Response
            return response()->json([
                "user" => new CompanyResource($company),
                "access_token" => $token->accessToken,
                "token_type" => "bearer",
                "expires_at" => $expiration,
            ], 200);
        }
    }

    public function Logout(Request $request)
    {
        $request->user()->token()->delete();
        // Response
        return response()->json([
            "message" => "Logged Out Successfully",
        ], 200);
    }

    public function SendEmailVerification(Request $request)
    {
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

    public function VerifyEmail(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 404);
        }

        // Check verification
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

        // Response
        return response()->json([
            'message' => 'Email verification failed',
        ], 500);
    }

    public function IsExpired(Request $request)
    {
        return response()->json([
            'message' => 'Token is valid'
        ], 200);
    }

    public function IsVerified(Request $request)
    {
        // Get User
        $user = auth()->user();

        // Check email verification
        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Verified'
            ], 200);
        }

        // Response
        return response()->json([
            'message' => 'Not Verified'
        ], 401);
    }

    public function GetRegisterStep(Request $request)
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
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

        // Response
        return response()->json([
            'step' => $individual->register_step()
        ], 200);
    }
}
