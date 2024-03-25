<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\ResetPassword;
use App\Http\Requests\ForgetPasswordRequest;

class ForgetPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
        $user=User::where("email",$request->email)->first();
        $token=$user->createToken(name:'auth-token')->accessToken;
        $user->notify(new ResetPassword($token));
        return response()->json([
            "message"=>"reset password has been sent"
        ]);
    }
    public function reset(ForgetPasswordRequest $request){
        $validated=$request->validated();
        $user=User::where("email",$validated['email'])->first();
        $validated['password']=bcrypt($validated['password']);
        $user->update($validated);
        return response()->json([
            "data" => $user,
            "access_token" => $user->createToken(name:'auth-token')->accessToken,
            "token_type" => "bearer"
        ]);
    }
}
