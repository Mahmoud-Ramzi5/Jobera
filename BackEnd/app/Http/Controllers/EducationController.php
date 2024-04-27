<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddEducationRequest;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function AddEducation(AddEducationRequest $request){
        $user = auth()->user();
        
    }
}
