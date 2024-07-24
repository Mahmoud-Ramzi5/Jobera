<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Requests\EditProfileRequest;
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
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check individual
        $individual = Individual::where('user_id', $user->id)->first();
        if ($individual != null) {
            // Response
            return response()->json([
                "user" => new IndividualResource($individual),
            ], 200);
        }

        // Check company
        $company = Company::where('user_id', $user->id)->first();
        if ($company != null) {
            // Response
            return response()->json([
                "user" => new CompanyResource($company),
            ], 200);
        }

        // Response
        return response()->json([
            'errors' => ['user' => 'Invalid user']
        ], 401);
    }

    public function GetWallet()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Response
        return response()->json([
            'wallet' => $user->wallet
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
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check individual
        $individual = Individual::where('user_id', $user->id)->first();
        if ($individual != null) {
            // Edit user
            $user->fill($validated);
            $user->save();
            $individual->fill($validated);
            $individual->save();

            // Response
            return response()->json([
                "message" => "User data updated successfully",
                'user' => new IndividualResource($individual)
            ], 200);
        }

        // Check company
        $company = Company::where('user_id', $user->id)->first();
        if ($company != null) {
            // Edit user
            $user->fill($validated);
            $user->save();
            $company->fill($validated);
            $company->save();

            // Response
            return response()->json([
                "message" => "User data updated successfully",
                'user' => new CompanyResource($company)
            ], 200);
        }

        // Response
        return response()->json([
            'errors' => ['user' => 'Invalid user']
        ], 401);
    }

    public function EditProfilePhoto(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'avatar_photo' => 'required|image|max:4096'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Delete old avatar_photo (if found)
        $oldPath = $user->avatar_photo;
        if ($oldPath != null) {
            unlink(storage_path('app/' . $oldPath));
        }

        // Store new avatar_photo
        $file = $request->file('avatar_photo');
        $path = $file->storeAs($user->id . '/avatar', $file->getClientOriginalName());
        $user->avatar_photo = $path;
        $user->save();


        // Check individual
        $individual = Individual::where('user_id', $user->id)->first();
        if ($individual != null) {
            // Response
            return response()->json([
                "message" => "Profile photo has been added successfully",
                "user" => new IndividualResource($individual)
            ], 200);
        }

        // Check company
        $company = Company::where('user_id', $user->id)->first();
        if ($company != null) {
            // Response
            return response()->json([
                "message" => "Profile photo has been added successfully",
                "user" => new CompanyResource($company)
            ], 200);
        }

        // Response
        return response()->json([
            'errors' => ['user' => 'Invalid user']
        ], 401);
    }

    public function DeleteProfilePhoto(Request $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Delete old avatar_photo (if found)
        $oldPath = $user->avatar_photo;
        if ($oldPath != null) {
            unlink(storage_path('app/' . $oldPath));
        }

        $user->avatar_photo = null;
        $user->save();

        // Check individual
        $individual = Individual::where('user_id', $user->id)->first();
        if ($individual != null) {
            // Response
            return response()->json([
                "message" => "Profile photo has been deleted successfully",
                "user" => new IndividualResource($individual)
            ], 200);
        }

        // Check company
        $company = Company::where('user_id', $user->id)->first();
        if ($company != null) {
            // Response
            return response()->json([
                "message" => "Profile photo has been deleted successfully",
                "user" => new CompanyResource($company)
            ], 200);
        }

        // Response
        return response()->json([
            'errors' => ['user' => 'Invalid user']
        ], 401);
    }

    public function EditDescription(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'description' => 'required'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Update description
        $user->description = $validated['description'];
        $user->save();

        // Check individual
        $individual = Individual::where('user_id', $user->id)->first();
        if ($individual != null) {
            // Response
            return response()->json([
                "message" => "Description has been updated successfully",
                "user" => new IndividualResource($individual)
            ], 200);
        }

        // Check company
        $company = Company::where('user_id', $user->id)->first();
        if ($company != null) {
            // Response
            return response()->json([
                "message" => "Description has been updated successfully",
                "user" => new CompanyResource($company)
            ], 200);
        }

        // Response
        return response()->json([
            'errors' => ['user' => 'Invalid user']
        ], 401);
    }


    public function GetUserProfile(Request $request, $userId, $userName)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check individual
        $individual = Individual::where('user_id', $userId)
            ->where('full_name', $userName)->first();
        if ($individual != null) {
            // Response
            return response()->json([
                "user" => new IndividualResource($individual),
            ], 200);
        }

        // Check company
        $company = Company::where('user_id', $userId)
            ->where('name', $userName)->first();
        if ($company != null) {
            // Response
            return response()->json([
                "user" => new CompanyResource($company),
            ], 200);
        }

        // Response
        return response()->json([
            'errors' => ['user' => 'Invalid user']
        ], 404);
    }
}
