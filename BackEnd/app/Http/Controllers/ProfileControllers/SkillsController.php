<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\SkillResource;
use App\Http\Resources\SkillsCollection;
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
                'skills' => new skillsCollection(Skill::all()),
            ]);
        }
        return response()->json([
            'skills' => new skillsCollection(Skill::where($queryItems)->get()->all()),
        ]);
    }

    public function GetSkillTypes()
    {
        $enumValues = ['IT', 'Design', 'Business', 'Languages', 'Engineering', 'Worker'];
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
