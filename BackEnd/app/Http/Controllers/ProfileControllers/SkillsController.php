<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Models\Skill;
use App\Enums\SkillTypes;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Http\Resources\SkillCollection;
use App\Http\Requests\StoreSkillsRequest;


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

        // Response
        return response()->json([
            'user' => $user,
            'skills' => new SkillCollection($user->skills)
        ]);
    }

    public function AddUserSkills(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'skills' => 'required|array'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        $user->skills()->attach($validated['skills']);

        // Response
        return response()->json([
            "message" => "Skills added successfully",
            "skills" => new SkillCollection($user->skills)
        ], 200);
    }

    public function EditUserSkills(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'skills' => 'required|array'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Get user's current skills
        $currentSkills = $user->skills()->pluck('skill_id')->toArray();

        // Determine the skills to remove
        $skillsToRemove = array_diff($currentSkills, $validated['skills']);

        // Remove the skills that are not in the validated skills
        $user->skills()->whereIn('skill_id', $skillsToRemove)->delete();

        // Add the new skills
        foreach ($validated['skills'] as $skill) {
            // Check if the skill is already associated with the user
            if (!in_array($skill, $currentSkills)) {
                // Create a new skill if it's not already associated
                $user->skills()->attach($skill);
            }
        }

        // Response
        return response()->json([
            "message" => "Skills updated successfully",
            "skills" => new SkillCollection($user->skills)
        ], 200);
    }

    /* Admin Only */
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
