<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Models\User;
use App\Models\skill;
use App\Models\userSkills;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\skillResource;
use App\Http\Resources\skillsCollection;
use App\Http\Requests\storeSkillsRequest;
use App\Http\Requests\storeUserSkillRequest;

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
