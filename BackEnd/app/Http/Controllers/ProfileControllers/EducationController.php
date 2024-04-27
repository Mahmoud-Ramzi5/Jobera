<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Models\Education;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddEducationRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EducationController extends Controller
{
    public function AddEducation(AddEducationRequest $request){
        $user = auth()->user();
        if($user->education_id != null){
            return response()->json([
                "message"=>"already exists"
            ]);
        }
        $validated=$request->validated();
        // Handle certificate file
        if ($request->hasFile('certificate_file')) {
            $avatarPath = $request->file('certificate_file')->store('files', 'public');
            $validated['certificate_file'] = $avatarPath;
        }
        $validated['user_id']=$user->id;
        $education=Education::create($validated);
        $user->education_id=$education->id;
        $user->save();
        return response()->json([
            "message" => "education created",
            "data" => $education,
        ], 201);
    }

}
