<?php

use App\Models\State;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthControllers\AuthController;
use App\Http\Controllers\AuthControllers\SocialAuthController;
use App\Http\Controllers\AuthControllers\ForgetPasswordController;
use App\Http\Controllers\ProfileControllers\ProfileController;
use App\Http\Controllers\ProfileControllers\SkillsController;
use App\Http\Controllers\ProfileControllers\EducationController;
use App\Http\Controllers\ProfileControllers\PortfolioController;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'Register');
    Route::post('/company/register', 'CompanyRegister');
    Route::post('/login', 'Login');
    Route::post('/logout', 'Logout')->middleware('auth:api');

    Route::get('/auth/email', function() {
        return response()->json([
            "email" => auth()->user()->email
        ], 200);
    })->middleware('auth:api');

    Route::get('/verifyEmail', 'VerifyEmail')->middleware('auth:api');
    Route::get('/isExpired', 'IsExpired')->middleware('auth:api');
    Route::get('/isVerified', 'IsVerified')->middleware('auth:api');

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
    Route::get('/regStep','AdvanceRegisterStep')->middleware('auth:api');
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
    Route::get('/profile', 'ShowProfile')->middleware('auth:api');
    Route::put('/profile/edit', 'EditProfile')->middleware('auth:api');
    Route::post('/profilePhoto', 'AddProfilePhoto')->middleware('auth:api');
});

Route::controller(SkillsController::class)->group(function() {
    Route::get('/skills', 'GetSkills');
    Route::get('/skills/types', 'GetSkillTypes');

    Route::get('/user/skills', 'GetUserSkills')->middleware('auth:api');
    Route::post('/user/skills/add', 'AddUserSkills')->middleware('auth:api');
    Route::post('/user/skills/edit', 'EditUserSkills')->middleware('auth:api');

    Route::post('/skills', 'AddSkill');
});

Route::controller(EducationController::class)->group(function() {
    Route::post('/education', 'EditEducation')->middleware('auth:api');

    Route::get('/certificates', 'ShowUserCertificates')->middleware('auth:api');
    Route::get('/certificates/{certificate}', 'ShowCertificate')->middleware('auth:api');
    Route::post('/certificate/add', 'AddCertificate')->middleware('auth:api');
    Route::put('/certificate/edit/{certificate}', 'EditCertificate')->middleware('auth:api');
    Route::delete('/certificates/{certificate}', 'DeleteCertificate')->middleware('auth:api');
});

Route::controller(PortfolioController::class)->group(function() {
    Route::get('/portfolios', 'ShowUserPortfolios')->middleware('auth:api');
    Route::get('/portfolio/{portfolio}', 'ShowPortfolio')->middleware('auth:api');
    Route::post('/portfolio/add', 'AddPortfolio')->middleware('auth:api');
    Route::post('/portfolio/edit/{portfolio}', 'EditPortfolio')->middleware('auth:api');
    Route::delete('/portfolios/{portfolio}', 'DeletePortfolio')->middleware('auth:api');
});

Route::get('/file/{folder}/{file}', function(Request $request, $folder, $file) {
    return response()->file(storage_path('app/'.$folder.'/'.$file));
});
