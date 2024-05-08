<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Enums\SkillTypes;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
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
