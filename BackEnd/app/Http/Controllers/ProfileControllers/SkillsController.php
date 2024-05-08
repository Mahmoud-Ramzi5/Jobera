<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Models\Skill;
use App\Models\UserSkills;
use App\Enums\SkillTypes;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Http\Resources\SkillCollection;
use App\Http\Requests\StoreSkillsRequest;
use App\Http\Requests\StoreUserSkillsRequest;


class SkillsController extends Controller
{
    public function GetSkills(Request $request)
    {
        // Filter skills based on type
        $filter = new SkillFilter();
        $queryItems = $filter->transform($request);

        // Response
        if (empty($queryItems)) {
            return response()->json([
                'skills' => new SkillCollection(Skill::all()),
            ], 200);
        }
        return response()->json([
            'skills' => new SkillCollection(Skill::where($queryItems)->get()->all()),
        ], 200);
    }

    public function GetSkillTypes()
    {
        // Get SkillTypes
        $enumValues = SkillTypes::cases();
        $response = [];
        for($i = 0; $i<count($enumValues); $i++) {
            array_push($response, ['id' => $i+1, 'name' => $enumValues[$i]]);
        }

        // Response
        return response()->json([
            "types" => $response
        ], 200);
    }

    public function GetUserSkills()
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Get user's skills
        $userSkills = UserSkills::where('user_id', $user->id)->get()->all();

        // Send only skills
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

    public function AddUserSkills(StoreUserSkillsRequest $request)
    {
        // Validate request
        $validatedData = $request->validated();

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

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

    public function EditUserSkills(StoreUserSkillsRequest $request)
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

        // Get user's existing skills
        $existingSkills = $user->skills()->pluck('skill_id')->toArray();

        // Determine the skills to remove
        $skillsToRemove = array_diff($existingSkills, $validated['skills']);

        // Remove the skills that are not in the validated skills
        $user->skills()->whereIn('skill_id', $skillsToRemove)->delete();

        // Add the new skills
        foreach ($validated['skills'] as $skill) {
            // Check if the skill is already associated with the user
            if (!in_array($skill, $existingSkills)) {
                // Create a new skill if it's not already associated
                $user->skills()->create([
                    'skill_id' => $skill
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

    public function AddSkill(StoreSkillsRequest $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user->type == 'admin') {
            // Validate request
            $validatedData = $request->validated();
            $skill = Skill::create($validatedData);
            return new SkillResource($skill);
        }

        // Response
        return response()->json([
            "message" => "Not Authorized"
        ], 401);
    }
}
