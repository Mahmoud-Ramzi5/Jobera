<?php

use App\Http\Controllers\ProfileControllers\SkillsController;
use App\Models\State;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileControllers\ProfileController;
use App\Http\Controllers\AuthControllers\AuthController;
use App\Http\Controllers\AuthControllers\SocialAuthController;
use App\Http\Controllers\AuthControllers\ForgetPasswordController;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'Register');
    Route::post('/login', 'Login');
    Route::post('/logout', 'Logout')->middleware('auth:api');

    Route::get('/auth/email', function() {
        return response()->json([
            "email" => auth()->user()->email
        ], 200);
    })->middleware('auth:api');

    Route::get('/verifyEmail', 'VerifyEmail')->middleware('auth:api');
    Route::get('/isExpired', 'isExpired')->middleware('auth:api');

    Route::get('/countries', function () {
        return Response()->json([
            'countries' => Country::all(),
        ], 200);
    });

    Route::post('/states', function (Request $request) {
        $country_id = $request->input('country_id');
        return Response()->json([
            'states' => State::where('country_id', $country_id)->get()->all(),
        ], 200);
    });
});

Route::controller(SocialAuthController::class)->group(function () {
    Route::get('/auth/providers', 'RedirectToProviders');
    Route::get('/auth/{provider}/call-back', 'HandleProviderCallback');
});

Route::controller(ForgetPasswordController::class)->group(function () {
    Route::post('/password/reset-link', 'ForgotPassword');
    Route::post('/password/reset', 'Reset')->middleware('auth:api');
});

Route::controller(ProfileController::class)->group(function () {
    Route::get('/profile', 'Show')->middleware('auth:api');

    Route::get('/skills','getSkils')->middleware('auth:api');
    
});
Route::controller(SkillsController::class)->group(function(){
    Route::post('/skills','addSkill')->middleware('auth:api');
    Route::get('/profile/skills','getUserSkills')->middleware('auth:api');
    Route::post('/profile/skills','addUserSkill')->middleware('auth:api');
    Route::delete('/profile/skills/{userSkill_id}','removeUserSkill')->middleware('auth:api');
    Route::get('/skills/types','getSkillTypes')->middleware('auth:api');
});
