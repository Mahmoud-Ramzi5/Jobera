<?php

namespace App\Http\Controllers\AuthControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;
use GuzzleHttp\Exception\ClientException;
use App\Models\User;

class SocialAuthController extends Controller
{
    /**
     * Redirect the user to the Provider authentication page.
     *
     *
     * @return JsonResponse
     */
    public function RedirectToProviders() {
        return response()->json([
            'googleURL' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
            'facebookURL' => Socialite::driver('facebook')->stateless()->redirect()->getTargetUrl(),
            'linkedinURL' => Socialite::driver('linkedin')->stateless()->redirect()->getTargetUrl(),
        ], 200);
    }

    /**
     * Obtain the user information from Provider.
     *
     * @param $provider
     * @return JsonResponse
     */
    public function HandleProviderCallback($provider) {
        // Check driver
        if (!in_array($provider, ['google', 'facebook', 'linkedin'])) {
            return response()->json([
                'error' => 'Please login using Google, Facebook or Linkedin.'
            ], 422);
        }

        // Get user from provider
        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (ClientException $exception) {
            return response()->json([
                'error' => 'Invalid credentials provided.'
            ], 422);
        }

        // Login user
        $userDB = User::where('email', $user->getEmail())->first();
        $token = $userDB->createToken("api_token")->accessToken;

        $userDB->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $user->getId(),
            ],
            [
                'avatar' => $user->getAvatar()
            ]
        );

        // Response
        return response()->json([
            "data" => $user,
            "access_token" => $token,
            "token_type" => "bearer"
        ], 200);
    }
}
