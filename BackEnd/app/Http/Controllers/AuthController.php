<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\EmailVerification;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $validated=$request->validated();
        $validated['password']=bcrypt($validated['password']);
        $validated = Arr::except($validated, 'confirmPassword');
        $user=User::create($validated);
        $this->SendEmailVerification($request);
        return response()->json([
            "message"=>"users registered",
            "data"=>$user,
            "token"=>$user->createToken("api_token")->accessToken
        ],201);
    }
    public function login(LoginRequest $request){
        $validated = $request->validated();
        if(! Auth::attempt($validated)){
            return response()->json([
                "error"=> "invalid phone number or password"
            ],401);
        }
        $user=User::where("email",$validated['email'])->first();
        return response()->json([
            "data"=>$user,
            "access_token" => $user->createToken("api_token")->accessToken,
            "token_type" => "bearer"
        ]);
    }
    public function SendEmailVerification(Request $request){
        $request->validate([
            'email' => 'required|email',
        ]);
        $user=User::where("email",$request->email)->first();
        $token=$user->createToken(name:'auth-token')->accessToken;
        $user->notify(new EmailVerification($token));
        return response()->json([
            "message"=>"Verification email has been sent"
        ]);
    }
    public function verifyEmail(Request $request)
{
    $request->validate([
        'token' => 'required'
    ]);

    $user = Auth()->user();

    if (!$user) {
        return response()->json([
            'error' => 'Invalid token',
        ], 404);
    }

    if ($user->email_verified_at || $user->hasVerifiedEmail()) {
        return response()->json([
            'message' => 'Email already verified',
        ]);
    }

    if ($user->markEmailAsVerified()) {
        return response()->json([
            'message' => 'Email verified successfully',
        ]);
    }

    return response()->json([
        'error' => 'Email verification failed',
    ], 500);
}
}
