<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\Skill;
use App\Enums\SkillTypes;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSkillsRequest;
use App\Http\Resources\SkillResource;
use App\Http\Resources\SkillCollection;

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

        // Response
        return response()->json([
            'skills' => new SkillCollection(Skill::where($queryItems)->get()->all()),
        ], 200);
    }

    public function GetSkillTypes()
    {
        // Get SkillTypes
        $enumNames = SkillTypes::names();
        $enumValues = SkillTypes::values();
        $response = [];
        for($i = 0; $i < count($enumValues); $i++) {
            array_push($response, ['id' => $i + 1, 'name' => $enumNames[$i], 'value' => $enumValues[$i]]);
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
                'error' => 'Invalid user'
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'error' => 'Invalid user'
            ], 401);
        }

        // Response
        return response()->json([
            'skills' => new SkillCollection($individual->skills)
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
                'error' => 'Invalid user'
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'error' => 'Invalid user'
            ], 401);
        }

        // Add skills to individual
        $individual->skills()->attach($validated['skills']);

        // Response
        return response()->json([
            "message" => "Skills added successfully",
            "skills" => new SkillCollection($individual->skills)
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
                'error' => 'Invalid user'
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Get user's current skills
        $currentSkills = $individual->skills()->pluck('skill_id')->toArray();

        // Determine the skills to remove
        $skillsToRemove = array_diff($currentSkills, $validated['skills']);

        // Remove the skills that are not in the validated skills
        $individual->skills()->detach($skillsToRemove);

        // Add the new skills
        foreach ($validated['skills'] as $skill) {
            // Check if the skill is already associated with the user
            if (!in_array($skill, $currentSkills)) {
                // Create a new skill if it's not already associated
                $individual->skills()->attach($skill);
            }
        }

        // Response
        return response()->json([
            "message" => "Skills updated successfully",
            "skills" => new SkillCollection($individual->skills)
        ], 200);
    }

    /* Admin Only */
    public function AddSkill(StoreSkillsRequest $request)
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'error' => 'Invalid user'
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'error' => 'Invalid user'
            ], 401);
        }

        if ($individual->type == 'admin') {
            // Validate request
            $validated = $request->validated();
            $skill = Skill::create($validated);

            // Response
            return response()->json([
                "message" => "Skill added successfully",
                "skill" => new SkillResource($skill)
            ], 200);
        }

        // Response
        return response()->json([
            "error" => "Not Authorized"
        ], 401);
    }
}
