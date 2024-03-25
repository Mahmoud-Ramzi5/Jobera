<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthControllers\AuthController;
use App\Http\Controllers\AuthControllers\SocialAuthController;
use App\Http\Controllers\AuthControllers\ForgetPasswordController;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'Register');
    Route::post('/login', 'Login');

    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:api');

    Route::get('/email',function() {
        return response()->json([
            "email" => auth()->user()->email
            ]
        );
    })->middleware('auth:api');
    Route::get('/verifyEmail', 'VerifyEmail')->middleware('auth:api');
});

Route::controller(SocialAuthController::class)->group(function () {
    Route::get('/auth/providers', 'RedirectToProviders');
    Route::get('/auth/{provider}/call-back', 'HandleProviderCallback');
});

Route::controller(ForgetPasswordController::class)->group(function () {
    Route::post('/password/reset-link', 'ForgotPassword');
    Route::post('/password/reset', 'Reset')->middleware('auth:api');
});
