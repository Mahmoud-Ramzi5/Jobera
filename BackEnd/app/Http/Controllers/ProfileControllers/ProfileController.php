<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Models\Individual;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditProfileRequest;
use App\Http\Requests\StoreProfilePhotoRequest;
use App\Http\Resources\IndividualResource;
use App\Http\Resources\CompanyResource;

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

        // Check individual
        $individual = Individual::where("user_id", $user->id)->first();
        if ($individual != null) {
            // Response
            return response()->json([
                "user" => new IndividualResource($individual),
            ], 200);
        }

        // Check company
        $company = Company::where("user_id", $user->id)->first();
        if ($company != null) {
            // Response
            return response()->json([
                "user" => new CompanyResource($company),
            ], 200);
        }
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
        $individual=Individual::where('user_id',$user->id)->first();
        $individual->avatar_photo = $avatarPath;
        $individual->save();
        // Response
        return response()->json([
            "message"=>"Profile photo has been add successfully",
            "data"=>new IndividualResource($individual)
        ], 200);
    }
}
