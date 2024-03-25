<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\ForgetPasswordController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::prefix('auth')->group(function () {
    Route::controller(SocialAuthController::class)->group(function () {
        Route::get('/providers', 'redirectToProviders');
        Route::get('/{provider}/call-back', 'handleProviderCallback');
    });
});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::get('/email',function() {
    return response()->json([
        "email" => auth()->user()->email
        ]
    );
})->middleware('auth:api');
Route::get('/verifyEmail',[AuthController::class,'verifyEmail'])->middleware('auth:api');
Route::post('/password/reset-link', [ForgetPasswordController::class, 'forgotPassword']);
Route::post('/password/reset', [ForgetPasswordController::class, 'reset'])->middleware('auth:api');
