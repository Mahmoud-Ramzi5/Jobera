<?php

use App\Models\State;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Models\FreelancingJob;
use App\Enums\IndividualGender;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthControllers\AuthController;
use App\Http\Controllers\JobControllers\RegJobsController;
use App\Http\Controllers\ProfileControllers\SkillsController;
use App\Http\Controllers\AuthControllers\SocialAuthController;
use App\Http\Controllers\ProfileControllers\ProfileController;
use App\Http\Controllers\ProfileControllers\EducationController;
use App\Http\Controllers\ProfileControllers\PortfolioController;
use App\Http\Controllers\AuthControllers\ForgetPasswordController;
use App\Http\Controllers\JobControllers\FreelancingJobsController;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'Register');
    Route::post('/company/register', 'CompanyRegister');
    Route::post('/login', 'Login');

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', 'Logout');

        Route::get('/auth/email', function() {
            return response()->json([
                "email" => auth()->user()->email
            ], 200);
        })->middleware('auth:api');

        Route::get('/verifyEmail', 'VerifyEmail');
        Route::get('/isExpired', 'IsExpired');
        Route::get('/isVerified', 'IsVerified');

        Route::get('/regStep', 'GetRegisterStep');
        Route::post('/regStep', 'AdvanceRegisterStep');
    });

    Route::get('/countries', function () {
        return Response()->json([
            'countries' => Country::all(),
        ], 200);
    });

    Route::post('/states', function (Request $request) {
        $validated = $request->validate([
            'country_name' => 'required'
        ]);
        $country = Country::where('country_name', $validated['country_name'])->first();

        return Response()->json([
            'states' => State::where('country_id', $country->country_id)->get()->all(),
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
    Route::middleware('auth:api')->group(function () {
        Route::get('/profile', 'ShowProfile');
        Route::post('/profile/edit', 'EditProfile');
        Route::post('/profile/photo', 'EditProfilePhoto');
        Route::post('/profile/description', 'EditDescription');
    });
});

Route::controller(SkillsController::class)->group(function() {
    Route::get('/skills', 'GetSkills');
    Route::get('/skills/types', 'GetSkillTypes');
    Route::middleware('auth:api')->group(function () {
        Route::get('/user/skills', 'GetUserSkills');
        Route::post('/user/skills/add', 'AddUserSkills');
        Route::post('/user/skills/edit', 'EditUserSkills');
    });
    Route::post('/skills', 'AddSkill');
});

Route::controller(EducationController::class)->group(function() {
    Route::middleware('auth:api')->group(function () {
        Route::post('/education', 'EditEducation');

        Route::get('/certificates', 'ShowUserCertificates');
        Route::post('/certificate/add', 'AddCertificate');
        Route::post('/certificate/edit/{certificate}', 'EditCertificate');
        Route::delete('/certificates/{certificate}', 'DeleteCertificate');
    });
});

Route::controller(PortfolioController::class)->group(function() {
    Route::middleware('auth:api')->group(function () {
        Route::get('/portfolios', 'ShowUserPortfolios');
        Route::get('/portfolio/{portfolio}', 'ShowPortfolio');
        Route::post('/portfolio/add', 'AddPortfolio');
        Route::post('/portfolio/edit/{portfolio}', 'EditPortfolio');
        Route::delete('/portfolios/{portfolio}', 'DeletePortfolio');
    });
});
Route::controller(RegJobsController::class)->group(function() {
    Route::middleware('auth:api')->group(function () {
        Route::post('/regJob/add','PostRegJob');
        Route::get('/regJobs','ViewRegJobs');
        Route::get('regJobs/{regJob}','ShowRegJob');
        Route::delete('regJobs/{regJob}','DeleteRegJob');
        Route::post('/regJob/apply','ApplyRegJob');
        Route::get('regJobs/{regJob}/competetors','ViewRegJobCompetetors');
    });
});
Route::controller(FreelancingJobsController::class)->group(function() {
    Route::middleware('auth:api')->group(function () {
        Route::post('/FreelancingJob/add','PostFreelancingJob');
        Route::get('/FreelancingJobs','ViewFreelancingJobs');
        Route::get('FreelancingJobs/{FreelancingJob}','ShowFreelancingJob');
        Route::delete('FreelancingJobs/{FreelancingJob}','DeleteFreelancingJob');
        Route::post('/FreelancingJob/apply','ApplyFreelancingJob');
        Route::get('FreelancingJobs/{FreelancingJob}/competetors','ViewFreelancingJobCompetetors');
    });
});


Route::get('/file/{user_id}/{folder}/{file}', function(Request $request, $user_id ,$folder, $file) {
    $path = storage_path('app/'.$user_id.'/'.$folder.'/'.$file);
    if ($path == null) {
        return null;
    }
    return response()->file($path);
});

Route::get('/image/{user_id}/{folder}/{image}', function(Request $request, $user_id ,$folder, $image) {
    $path = storage_path('app/'.$user_id.'/'.$folder.'/'.$image);
    if ($path == null) {
        return null;
    }
    return response()->file($path);
});
