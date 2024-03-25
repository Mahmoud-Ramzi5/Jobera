<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocialAuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::get('/auth/providers', [SocialAuthController::class,'redirectToProviders']);
Route::get('/auth/{provider}/call-back', [SocialAuthController::class,'handleProviderCallback']);
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);