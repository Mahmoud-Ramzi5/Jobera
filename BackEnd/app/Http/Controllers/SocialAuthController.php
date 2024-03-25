<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class SocialAuthController extends Controller
{
    /**
     * Redirect the user to the Provider authentication page.
     *
     *
     * @return JsonResponse
     */
    public function redirectToProviders()
    {
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
    public function handleProviderCallback($provider)
    {
        if (!in_array($provider, ['google', 'facebook', 'linkedin'])) {
            return response()->json([
                'error' => 'Please login using Google, Facebook or Linkedin.'
            ], 422);
        }
        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (ClientException $exception) {
            return response()->json([
                'error' => 'Invalid credentials provided.'
            ], 422);
        }

        $userCreated = User::firstOrCreate(
            [
                'email' => $user->getEmail()
            ],
            [
                'name' => $user->getName(),
                'status' => true,
            ]
        );
        $userCreated->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $user->getId(),
            ],
            [
                'avatar' => $user->getAvatar()
            ]
        );

        $token = $userCreated->createToken($provider.'-token')->accessToken;

        return response()->json([
            'Access-Token' => $token
        ], 200);
    }
}
