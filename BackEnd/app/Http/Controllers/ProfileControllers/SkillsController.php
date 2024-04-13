<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use App\Http\Resources\SkillResource;
use App\Http\Resources\SkillsCollection;
use App\Http\Requests\StoreSkillsRequest;


class SkillsController extends Controller
{
    public function GetSkills(Request $request)
    {
      /*  $request->validate([
            "type" => "required|in:IT,Design,Business,Languages,Engineering,Worker"
        ]);

        return response()->json([
            'skills' => Skill::where("type", $request->input("type"))->get()->all()
        ], 200);
        */
        // Rip Hisham
        
        // Filter skills based on type
        $filter = new SkillFilter();
        $queryItems = $filter->transform($request);

        // Response
        if (empty($queryItems)) {
            return response()->json([
                'skills' => new SkillsCollection(Skill::all()),
            ]);
        }
        return response()->json([
            'skills' => new SkillsCollection(Skill::where($queryItems)->get()->all()),
        ]);
    }

    public function GetSkillTypes()
    {
        $enumValues =
        [
            ['id' => '1', 'name' => 'IT'],
            ['id' => '2', 'name' => 'Design'],
            ['id' => '3', 'name' => 'Business'],
            ['id' => '4', 'name' => 'Languages'],
            ['id' => '5', 'name' => 'Engineering'],
            ['id' => '6', 'name' => 'Worker'],
        ];

        // Response
        return response()->json([
            "types" => $enumValues
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
