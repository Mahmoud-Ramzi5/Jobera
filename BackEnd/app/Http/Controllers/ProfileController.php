<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\skill;
use App\Filters\SkillFilter;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\skillsCollection;

class ProfileController extends Controller
{
    public function show(){
        $user=Auth::user();
        return new UserResource($user);
    }
    public function getSkills(Request $request){
        $filter = new SkillFilter();
        $queryItems = $filter->transform($request); 
        if(empty($queryItems)){
            return new skillsCollection(skill::all());
        }   
        return new skillsCollection(skill::where($queryItems)->get());      
    }
}
