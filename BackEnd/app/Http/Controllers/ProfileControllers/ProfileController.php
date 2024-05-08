<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Models\Individual;
use App\Models\UserSkills;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditProfileRequest;
use App\Http\Resources\IndividualResource;
use App\Http\Requests\EditUserSkillsRequest;
use App\Http\Requests\StoreUserSkillRequest;
use App\Http\Requests\StoreProfilePhotoRequest;

class ProfileController extends Controller
{
    public function Show()
{
    $user = auth()->user();
    $individual = Individual::where('user_id', $user->id)->firstOrFail();
    // Response
    return response()->json([
        'user' => new IndividualResource($individual)
    ], 200);
}

    public function EditProfile(EditProfileRequest $request){
        $validated=$request->validated();
        // Get User
        $user = auth()->user();
        $individual = Individual::where('user_id', $user->id)->firstOrFail();
        $user->fill($validated);
        $user->save();
        $individual->fill($validated);
        $individual->save();
        return response()->json([
            "message"=>"user data updated",
            'user' => new IndividualResource($individual)
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
        ], 200);
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
    public function EditUserSkill(EditUserSkillsRequest $request)
    {
        // Get user
        $user = auth()->user();
        
        // Validate the request
        $validated = $request->validated();
        
        // Get the user's existing skills
        $existingSkills = $user->skills()->pluck('skill_id')->toArray();
        
        // Determine the skills to remove
        $skillsToRemove = array_diff($existingSkills, $validated['skills']);
        
        // Remove the skills that are not in the validated skills
        $user->skills()->whereIn('skill_id', $skillsToRemove)->delete();
        
        // Add the new skills
        foreach ($validated['skills'] as $skillData) {
            // Check if the skill is already associated with the user
            if (!in_array($skillData, $existingSkills)) {
                // Create a new skill if it's not already associated
                $user->skills()->create([
                    'skill_id' => $skillData
                ]);
            }
        }
    
        // Get the updated list of skills
        $updatedSkills = $user->skills()->get();
    
        // Response
        return response()->json([
            "message" => "Skills updated successfully",
            "skills" => $updatedSkills
        ], 200);
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
