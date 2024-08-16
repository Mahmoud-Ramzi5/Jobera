<?php

namespace App\Http\Controllers\AuthControllers;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\Individual;
use App\Models\Company;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\CompanyRegisterRequest;
use App\Http\Resources\IndividualResource;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\AdminResource;
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

        // Create user and send verification email
        $user = User::create([
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'password' => $validated['password'],
            'state_id' => $validated['state_id'],
        ]);

        // Check user
        if ($user == null) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Create individual
        $validated['user_id'] = $user->id;
        $individual = Individual::create($validated);

        // Check individual
        if ($individual == null) {
            // delete user if individual is not created
            $user->delete();

            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Create wallet
        $wallet = Wallet::create([
            'id' => $user->id,
            'user_id' => $user->id,
            'total_balance' => 00.0000,
            'available_balance' => 00.0000,
            'reserved_balance' => 00.0000,
        ]);

        // Check wallet
        if ($wallet == null) {
            // delete user & individual if wallet is not created
            $user->delete();
            $individual->delete();

            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Create Token
        $token = $user->createToken("api_token")->accessToken;
        $this->SendVerificationEmail($request);

        // Response
        return response()->json([
            "message" => "Individual registered",
            "individual" => new IndividualResource($individual),
            "access_token" => $token,
            "token_type" => "bearer",
        ], 201);
    }

    public function CompanyRegister(CompanyRegisterRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Hash password and remove confirm password
        $validated['password'] = bcrypt($validated['password']);
        $validated = Arr::except($validated, 'confirm_password');

        // Create user and send verification email
        $user = User::create([
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'password' => $validated['password'],
            'state_id' => $validated['state_id'],
        ]);

        // Check user
        if ($user == null) {
            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Create company
        $validated['user_id'] = $user->id;
        $company = Company::create($validated);

        // Check company
        if ($company == null) {
            // delete user if company is not created
            $user->delete();

            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Create wallet
        $wallet = Wallet::create([
            'id' => $user->id,
            'user_id' => $user->id,
            'total_balance' => 00.0000,
            'available_balance' => 00.0000,
            'reserved_balance' => 00.0000,
        ]);

        // Check wallet
        if ($wallet == null) {
            // delete user & individual if wallet is not created
            $user->delete();
            $company->delete();

            // Response
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Create Token
        $token = $user->createToken("api_token")->accessToken;
        $this->SendVerificationEmail($request);

        // Response
        return response()->json([
            "message" => "Company registered",
            "company" => new CompanyResource($company),
            "access_token" => $token,
            "token_type" => "bearer",
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
                'errors' => ['data' => 'Invalid email or password'],
            ], 401);
        }

        // Login user
        $user = User::where("email", $validated['email'])->first();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
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

        // Response
        return response()->json([
            "user" => new AdminResource($user),
            "access_token" => $token->accessToken,
            "token_type" => "bearer",
            "expires_at" => $expiration,
        ], 200);
    }

    public function Logout(Request $request)
    {
        // Delete Token
        $request->user()->token()->delete();

        // Response
        return response()->json([
            "message" => "Logged Out Successfully",
        ], 200);
    }

    public function SendVerificationEmail(Request $request)
    {
        // Get user
        $user = User::find(auth()->user()->id);

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 404);
        }

        // Create Token
        $token = $user->createToken('auth-token')->accessToken;

        // Send Token
        $user->notify(new EmailVerification($token));

        // Response
        return response()->json([
            "message" => "Verification email has been sent",
        ], 200);
    }

    public function VerifyEmail(Request $request)
    {
        // Get user
        $user = User::find(auth()->user()->id);

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
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
            'errors' => ['email' => 'Email verification failed'],
        ], 500);
    }

    public function IsExpired(Request $request)
    {
        return response()->json([
            'message' => 'Token is valid',
        ], 200);
    }

    public function IsVerified(Request $request)
    {
        // Get User
        $user = auth()->user();

        // Check email verification
        if ($user->email_verified_at) {
            return response()->json([
                'message' => 'Verified',
            ], 200);
        }

        // Response
        return response()->json([
            'message' => 'Not Verified',
        ], 401);
    }

    public function GetRegisterStep(Request $request)
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user',
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user'],
            ], 401);
        }

        // Response
        return response()->json([
            'step' => $individual->register_step(),
        ], 200);
    }
}
