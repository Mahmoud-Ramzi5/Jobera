<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\Education;
use App\Models\Certificate;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\EducationRequest;
use App\Http\Requests\CertificateRequest;
use App\Http\Resources\EducationResource;
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
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get education
        $education = $individual->education;

        // Handle certificate file
        if ($request->hasFile('certificate_file')) {
            // Check education
            if($education != null) {
                // Delete old certificate_file (if found)
                $oldPath = $education->certificate_file;
                if ($oldPath != null) {
                    unlink(storage_path('app/'.$oldPath));
                }
            }
            $file = $request->file('certificate_file');
            $path = $file->storeAs($user->id.'/education', $file->getClientOriginalName());
            $validated['certificate_file'] = $path;
        }

        // Check education
        if($education == null) {
            // Create user's education
            $validated['individual_id'] = $individual->id;
            $education = Education::create($validated);

            // Response
            return response()->json([
                "message" => "Education added",
                "data" => new EducationResource($education),
            ], 201);
        }
        else {
            // Update user's education
            $education->update($validated);

            // Response
            return response()->json([
                "message" => "Education updated",
                "data" => new EducationResource($education),
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
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get individual's certificates
        $certificates = $individual->certificates;

        // Response
        return response()->json([
            "certificates" => new CertificateCollection($certificates)
        ], 200);
    }

    public function AddCertificate(CertificateRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Create certificate
        $validated['individual_id'] = $individual->id;
        $certificate = Certificate::create($validated);

        // Handle certificate file
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->storeAs($user->id.'/certificate-'.$certificate->id, $file->getClientOriginalName());
            $certificate->file = $path;
            $certificate->save();
        }

        // Response
        return response()->json([
            "message" => "Certificate created",
            "data" => new CertificateResource($certificate),
        ], 201);
    }

    public function EditCertificate(CertificateRequest $request, Certificate $certificate)
    {
        // Validate request
        $validated = $request->validated();

        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check if certificate belongs to individual
        if($individual->id != $certificate->individual_id) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Handle certificate file
        if ($request->hasFile('file')) {
            // Delete old certificate_file (if found)
            $oldPath = $certificate->file;
            if ($oldPath != null) {
                unlink(storage_path('app/'.$oldPath));
            }

            // Add new certificate_file
            $file = $request->file('file');
            $path = $file->storeAs($user->id.'/certificate-'.$certificate->id, $file->getClientOriginalName());
            $validated['file'] = $path;
        }

        // Update user's certificate
        $certificate->update($validated);

        // Response
        return response()->json([
            "message" => "Certificate updated",
            "data" => new CertificateResource($certificate),
        ], 200);
    }

    public function DeleteCertificate(Request $request, Certificate $certificate)
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get individual
        $individual = Individual::where('user_id', $user->id)->first();

        // Check individual
        if ($individual == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check if certificate belongs to individual
        if($individual->id != $certificate->individual_id) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Delete old certificate_file (if found)
        $oldPath = $certificate->file;
        if ($oldPath != null) {
            unlink(storage_path('app/'.$oldPath));
        }

        // Delete certificate
        $certificate->delete();

        // Response
        return response()->json([
            "message" => "Certificate has been deleted successfully",
        ], 204);
    }
}
