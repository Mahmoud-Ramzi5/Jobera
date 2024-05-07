<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditEducatonRequest;
use App\Models\Education;
use App\Models\Certificate;
use Illuminate\Http\Request;
use App\Http\Resources\CertificateResource;
use App\Http\Resources\CertificateCollection;
use App\Http\Requests\AddEducationRequest;
use App\Http\Requests\AddCertificateRequest;

class EducationController extends Controller
{
    public function AddEducation(AddEducationRequest $request)
    {
        // Get User
        $user = auth()->user();
        if($user->education != null) {
            return response()->json([
                "message" => "already exists"
            ]);
        }

        // Validate request
        $validated = $request->validated();

        // Handle certificate file
        if ($request->hasFile('certificate_file')) {
            $avatarPath = $request->file('certificate_file')->store('files', 'public');
            $validated['certificate_file'] = $avatarPath;
        }

        $validated['user_id'] = $user->id;
        $education = Education::create($validated);

        // Response
        return response()->json([
            "message" => "Education created",
            "data" => $education,
        ], 201);
    }

    public function EditEducation(EditEducatonRequest $request){
         // Validate request
         $validated = $request->validated();

         // Handle certificate file
         if ($request->hasFile('certificate_file')) {
             $avatarPath = $request->file('certificate_file')->store('files', 'public');
             $validated['certificate_file'] = $avatarPath;
         }
         $education = Education::update($validated);
         // Response
        return response()->json([
            "message" => "Education updated",
            "data" => $education,
        ], 201);
    }
    public function EditCertificate(EditEducatonRequest $request){
        // Validate request
        $validated = $request->validated();

        // Handle certificate file
        if ($request->hasFile('file')) {
            $avatarPath = $request->file('file')->store('files', 'public');
            $validated['file'] = $avatarPath;
        }
        $certificate = Certificate::create($validated);

        // Response
        return response()->json([
            "message" => "Certificate updated",
            "data" => new CertificateResource($certificate),
        ], 202);
   }

    public function AddCertificate(AddCertificateRequest $request)
    {
        // Get User
        $user = auth()->user();

        // Validate request
        $validated = $request->validated();

        // Handle certificate file
        if ($request->hasFile('file')) {
            $avatarPath = $request->file('file')->store('files', 'public');
            $validated['file'] = $avatarPath;
        }

        $validated['user_id'] = $user->id;
        $certificate = Certificate::create($validated);

        // Response
        return response()->json([
            "message" => "Certificate created",
            "data" => new CertificateResource($certificate),
        ], 201);
    }

    public function ShowUserCertificate()
    {
        // Get User
        $user = auth()->user();
        $certificates = $user->certificates()->get();

        // Response
        return response()->json([
            "data" => new CertificateCollection($certificates)
        ], 202);
    }
}
