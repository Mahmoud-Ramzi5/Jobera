<?php

use App\Models\State;
use App\Models\Country;
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

Route::get('/GG', function () {
    $fileContent = file_get_contents(storage_path("countries.json"));
    $jsonContent = json_decode($fileContent, true);
    foreach($jsonContent as $country)
    {
        $C = Country::create([
            "country_id" => $country["country_id"],
            "sortName"=> $country["sortname"],
            "countryName"=> $country["country_name"],
        ]);
        foreach($country["states"] as $state) {
            $S = State::create([
                "state_id" => $state["state_id"],
                "stateName"=> $state["state_name"],
                "country_id"=> $state["country_id"],
            ]);
        }
    }
});

Route::get('/countries', function () {
    return Response()->json([
        'C' => Country::all(),
    ]);
});

Route::post('/states', function (Request $request) {
    $country_id = $request->input('country_id');
    return Response()->json([
        'C' => State::where('country_id', $country_id)->get()->all(),
    ]);
});


