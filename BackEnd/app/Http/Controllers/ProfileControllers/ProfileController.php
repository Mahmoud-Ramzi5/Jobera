<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\skill;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\skillsCollection;

class ProfileController extends Controller
{
    public function show()
    {
        // Response
        return Response()->json([
            'user' => new UserResource(auth()->user())
        ], 200);
    }
    public function getSkills(Request $request)
    {
        $filter = new SkillFilter();
        $queryItems = $filter->transform($request);
        if (empty($queryItems)) {
            return new skillsCollection(skill::all());
        }
        return new skillsCollection(skill::where($queryItems)->get());
    }
}
