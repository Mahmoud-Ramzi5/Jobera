<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditProfileRequest;
use App\Models\UserSkills;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUserSkillRequest;
use App\Http\Requests\StoreProfilePhotoRequest;

class ProfileController extends Controller
{
    public function Show()
    {
        // Response
        return response()->json([
            'user' => new UserResource(auth()->user())
        ], 200);
    }

    public function EditProfile(EditProfileRequest $request){
        $validated=$request->validated();
        // Get User
        $user = auth()->user();
        $user->update($validated);
        return response()->json([
            "message"=>"user data updated",
            "user"=>new UserResource($user)
        ],202);
    }

    public function GetUserSkills()
    {
        // Get User
        $user = auth()->user();
        $userSkills = UserSkills::where('user_id', $user->id)->get()->all();

        // Send Only skills
        $skills = [];
        foreach ($userSkills as $relation) {
            $skills[] = $relation->skill;
        }

        // Response
        return response()->json([
            'user' => $user,
            'skills' => $skills
        ]);
    }

    public function AddUserSkill(StoreUserSkillRequest $request)
    {
        // Validate request
        $validatedData = $request->validated();
        $user = auth()->user();

        $skills = [];
        foreach ($validatedData['skills'] as $skillData) {
            $skill = UserSkills::create([
                'user_id' => $user->id,
                'skill_id' => $skillData
            ]);
            $skills[] = $skill;
        }

        // Response
        return response()->json([
            "message" => "Skills added successfully",
            "skills" => $skills
        ], 202);
    }

    public function RemoveUserSkill(Request $request, $userSkill_id)
    {
        // Get skill
        $skill = UserSkills::find($userSkill_id);

        // Check skill
        if (!$skill) {
            return response()->json([
                'message' => 'Skill not found'
            ], 404);
        }

        // Delete skill
        $skill->delete();

        // Response
        return response()->json([
            'message' => 'Skill deleted successfully'
        ], 203);
    }

    public function AddProfilePhoto(StoreProfilePhotoRequest $request)
    {
        // Validate request
        $validated = $request->validated();
        $user = auth()->user();

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
