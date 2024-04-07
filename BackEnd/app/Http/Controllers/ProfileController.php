<?php

namespace App\Http\Controllers;

use App\Models\skill;
use App\Models\userSkills;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use App\Http\Resources\skillResource;
use App\Http\Resources\skillsCollection;
use App\Http\Requests\storeSkillsRequest;
use App\Http\Requests\storeUserSkillRequest;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return new UserResource($user);
    }
    public function getSkills(Request $request){
        $filter = new SkillFilter();
        $queryItems = $filter->transform($request);
        if (empty($queryItems)) {
            return new skillsCollection(skill::all());
        }
        return new skillsCollection(skill::where($queryItems)->get());
        }
        return new skillsCollection(skill::where($queryItems)->get());
    }
    public function addSkill(storeSkillsRequest $request)
    {
        $user = Auth::user();
        if ($user->type == 'admin') {
            $validatedData = $request->validated();
            $skill = skill::create($validatedData);
            return new skillResource($skill);
        }
        return response()->json([
            "message" => "Not Authorized"
        ], 401);
    }
    public function getUserSkills()
    {
        $user = Auth::user();
        $userSkills = userSkills::where('user_id', $user->id)->get();

        $skills = [];
        foreach ($userSkills as $relation) {
            $skills[] = $relation->skill;
        }
        return response()->json([
            'user' => $user,
            'skills' => $skills
        ]);
    }
    public function addUserSkill(storeUserSkillRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::user()->id;
        userSkills::create($validatedData);
        return response()->json([
            "message" => "skill is added succesfully"
        ], 202);
    }
    public function removeUserSkill(Request $request, $userSkill_id)
    {
        $skill = userSkills::find($userSkill_id);

        if (!$skill) {
            return response()->json([
                'message' => 'Skill not found'
            ], 404);
        }

        $skill->delete();

        return response()->json([
            'message' => 'Skill deleted successfully'
        ], 203);
    }
    public function getSkillTypes()
    {
        $enumValues = ['IT', 'design', 'business', 'languages', 'engineering', 'worker'];
        return response()->json(["types" => $enumValues]);
    }
}
