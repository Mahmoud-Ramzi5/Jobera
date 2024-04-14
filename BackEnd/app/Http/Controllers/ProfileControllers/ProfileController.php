<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\UserSkills;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUserSkillRequest;


class ProfileController extends Controller
{
    public function Show()
    {
        // Response
        return response()->json([
            'user' => new UserResource(auth()->user())
        ], 200);
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
        
        // Add skills
        $skills = [];
        foreach ($validatedData['skills'] as $skillData) {
            
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
}
