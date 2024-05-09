<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Education;
use App\Models\Certificate;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\AddEducationRequest;
use App\Http\Requests\EditEducationRequest;
use App\Http\Requests\AddCertificateRequest;
use App\Http\Requests\EditCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Http\Resources\CertificateCollection;

class EducationController extends Controller
{
    public function AddEducation(AddEducationRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }
        if ($user->education != null) {
            return response()->json([
                "message" => "User Education already exists"
            ], 400);
        }

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

    public function EditEducation(EditEducationRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }
        if($user == null) {
            return response()->json([
                "message" => "error"
            ], 400);
        }

        // Handle certificate file
        if ($request->hasFile('certificate_file')) {
            $avatarPath = $request->file('certificate_file')->store('files', 'public');
            $validated['certificate_file'] = $avatarPath;
        }

        $education = $user->education;
        $education->update($validated);

        // Response
        return response()->json([
            "message" => "Education updated",
            "data" => $education,
        ], 200);
    }

    public function ShowUserCertificates()
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Get user's certificates
        $certificates = $user->certificates;

        // Response
        return response()->json([
            "certificates" => new CertificateCollection($certificates)
        ], 200);
    }

    public function AddCertificate(AddCertificateRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

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

    public function EditCertificate(EditCertificateRequest $request,Certificate $certificate)
    {
        // Validate request
        $validated = $request->validated();

        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Handle certificate file
        if ($request->hasFile('file')) {
            $avatarPath = $request->file('file')->store('files', 'public');
            $validated['file'] = $avatarPath;
        }
        $certificate->update($validated);

        // Response
        return response()->json([
            "message" => "Certificate updated",
            "data" => new CertificateResource($certificate),
        ], 201);
    }
    public function DeleteCertificate(Request $request,Certificate $certificate){
        $certificate->delete();
        return response()->json([
            "message" => "Certificate deleted",
        ],202);
    }

    public function ShowCertificate(Request $request,Certificate $certificate){
        //response
        return response()->json([
            "data"=>new CertificateResource($certificate)
        ],201);
    }
}
