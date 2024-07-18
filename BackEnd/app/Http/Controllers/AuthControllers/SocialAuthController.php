<?php

namespace App\Http\Controllers\AuthControllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Individual;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\IndividualResource;
use App\Http\Resources\CompanyResource;
use Laravel\Socialite\Facades\Socialite;
use GuzzleHttp\Exception\ClientException;

class SocialAuthController extends Controller
{
    /**
     * Redirect the user to the Provider authentication page.
     *
     *
     * @return JsonResponse
     */
    public function RedirectToProviders()
    {
        return response()->json([
            'googleURL' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
            'facebookURL' => Socialite::driver('facebook')->stateless()->redirect()->getTargetUrl(),
            'linkedinURL' => Socialite::driver('linkedin')->stateless()->redirect()->getTargetUrl(),
        ], 200);
    }

    /**
     * Obtain the user information from Provider Web.
     *
     * @param $provider
     * @return JsonResponse
     */
    public function HandleProviderCallback($provider)
    {
        // Check driver
        if (!in_array($provider, ['google', 'facebook', 'linkedin'])) {
            return response()->json([
                'errors' => ['provider' => 'Please login using Google, Facebook or Linkedin.']
            ], 422);
        }

        // Get user from provider
        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (ClientException $exception) {
            return response()->json([
                'errors' => ['credentials' => 'Invalid credentials provided.']
            ], 422);
        }

        // Login user
        $userDB = User::where('email', $user->getEmail())->first();

        // Check user
        if ($userDB == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Add provider
        $userDB->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $user->getId(),
            ],
            [
                'avatar' => $user->getAvatar()
            ]
        );

        // Prepare token
        $token = $userDB->createToken("api_token")->accessToken;

        // Check individual
        $individual = Individual::where('user_id', $userDB->id)->first();
        if ($individual != null) {
            // Response
            return response()->json([
                'user' => new IndividualResource($individual),
                'access_token' => $token,
                'token_type' => 'bearer'
            ], 200);
        }

        // Check company
        $company = Company::where('user_id', $userDB->id)->first();
        if ($company != null) {
            // Response
            return response()->json([
                'user' => new CompanyResource($company),
                'access_token' => $token,
                'token_type' => 'bearer'
            ], 200);
        }

        return response()->json([
            'errors' => ['user' => 'Invalid user']
        ], 401);
    }

    /**
     * Obtain the user information from Provider.
     *
     * @param $request
     * @return JsonResponse
     */
    public function HandleProviderAndroid(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required',
            'provider' => 'required',
            'provider_id' => 'required',
            'avatar_photo' => 'required'
        ]);

        // Check driver
        if (!in_array($validated['provider'], ['google', 'facebook', 'linkedin'])) {
            return response()->json([
                'error' => 'Please login using Google, Facebook or Linkedin.'
            ], 422);
        }

        // Login user
        $userDB = User::where('email', $validated['email'])->first();

        // Check user
        if ($userDB == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        $token = $userDB->createToken("api_token")->accessToken;

        $userDB->providers()->updateOrCreate(
            [
                'provider' => $validated['provider'],
                'provider_id' => $validated['provider_id'],
            ],
            [
                'avatar' => $validated['avatar_photo']
            ]
        );

        // Response
        return response()->json([
            "user" => $userDB,
            "access_token" => $token,
            "token_type" => "bearer"
        ], 200);
    }
}
