<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Resources\CertificateCollection;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use App\Models\Education;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddEducationRequest;
use App\Http\Requests\AddCertificateRequest;
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

    public function AddCertificate(AddCertificateRequest $request){
        $user = auth()->user();
        $validated=$request->validated();
        // Handle certificate file
        if ($request->hasFile('file')) {
            $avatarPath = $request->file('file')->store('files', 'public');
            $validated['file'] = $avatarPath;
        }
        $validated['user_id']=$user->id;
        $certificate=Certificate::create($validated);
        return response()->json([
            "message" => "Certificate created",
            "data" => new CertificateResource($certificate),
        ], 201);
    }
    public function ShowUserCertificate(){
        $user = auth()->user();
        $certificates = $user->certificates()->get();
        return response()->json([
            "data"=> new CertificateCollection($certificates)
        ],202);       
    }
}
