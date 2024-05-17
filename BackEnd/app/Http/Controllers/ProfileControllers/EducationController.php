<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Education;
use App\Models\Certificate;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\EducationRequest;
use App\Http\Requests\AddCertificateRequest;
use App\Http\Requests\EditCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Http\Resources\CertificateCollection;

class EducationController extends Controller
{
    public function EditEducation(EducationRequest $request)
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
        if ($request->hasFile('certificate_file')) {
            $file = $request->file('certificate_file');
            $path = $file->storeAs('education_files', $file->getClientOriginalName());
            $validated['certificate_file'] = $path;
        }

        // Check education
        $education = $user->education;
        if($education == null) {
            // Create user's education
            $validated['user_id'] = $user->id;
            $education = Education::create($validated);

            // Response
            return response()->json([
                "message" => "Education added",
                "data" => $education,
            ], 201);
        }
        else {
            // Delete old certificate_file (if found)
            $oldPath = $education->certificate_file;
            if ($oldPath != null) {
                unlink(storage_path('app/'.$oldPath));
            }

            // Update user's education
            $education->update($validated);

            // Response
            return response()->json([
                "message" => "Education updated",
                "data" => $education,
            ], 200);
        }
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

    public function ShowCertificate(Request $request, Certificate $certificate)
    {
        //response
        return response()->json([
            "data" => new CertificateResource($certificate)
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

    public function EditCertificate(EditCertificateRequest $request, Certificate $certificate)
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
        ], 200);
    }

    public function DeleteCertificate(Request $request, Certificate $certificate)
    {
        $certificate->delete();

        return response()->json([
            "message" => "Certificate deleted",
        ], 202);
    }
}
