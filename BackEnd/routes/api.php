<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\ForgetPasswordController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::get('/auth/providers', [SocialAuthController::class,'redirectToProviders']);
Route::get('/auth/{provider}/call-back', [SocialAuthController::class,'handleProviderCallback']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::get('/email',function(Request $request){
    return response()->json([
        "email"=>$request->user()->email
        ]
    );
});
Route::post('/password/reset-link', [ForgetPasswordController::class, 'forgotPassword']);
Route::post('/password/reset', [ForgetPasswordController::class, 'reset']);