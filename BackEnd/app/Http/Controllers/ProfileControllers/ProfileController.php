<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Models\Individual;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditProfileRequest;
use App\Http\Resources\IndividualResource;
use App\Http\Requests\StoreProfilePhotoRequest;

class ProfileController extends Controller
{
    public function ShowProfile()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }
        $individual = Individual::where('user_id', $user->id)->firstOrFail();
        if ($individual == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Response
        return response()->json([
            'user' => new IndividualResource($individual)
        ], 200);
    }

    public function EditProfile(EditProfileRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }
        $individual = Individual::where('user_id', $user->id)->firstOrFail();
        if ($individual == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 400);
        }

        // Edit user
        $user->fill($validated);
        $user->save();
        $individual->fill($validated);
        $individual->save();

        // Response
        return response()->json([
            "message" => "User data updated successfully",
            'user' => new IndividualResource($individual)
        ], 201);
    }

    public function AddProfilePhoto(StoreProfilePhotoRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Store photo
        $avatarPath = $request->file('avatar_photo')->store('avatars', 'public');
        $user->avatarPhoto = $avatarPath;
        $user->save();

        // Response
        return response()->json([
            "message"=>"Profile photo has been add successfully"
        ], 200);
    }
}
