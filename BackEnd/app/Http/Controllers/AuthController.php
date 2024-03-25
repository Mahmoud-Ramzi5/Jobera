<?php

namespace App\Http\Controllers;

use App\Models\User;
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
}
