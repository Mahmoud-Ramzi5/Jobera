<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Support\Arr;
use App\Http\Resources\CertificateResource;
use App\Http\Requests\AddPortfolioRequest;

class PortfolioController extends Controller
{
    public function AddPortfolio(AddPortfolioRequest $request)
    {
        // Get User
        $user = auth()->user();
        if($user == null) {
            return response()->json([
                "message" => "user not found"
            ], 401);
        }

        // Validate request
        $validated = $request->validated();

        // Handle photo file
        if ($request->hasFile('photo')) {
            $Path = $request->file('photo')->store('avatars', 'public');
            $validated['photo'] = $Path;
        }

        // Handle portfolio files
        if ($request->hasFile('files')) {
            $files = $request->file('attachment');
            foreach ($files as $file) {
                $file->store('files', 'public');
            }
            $validated = Arr::except($validated, 'files');
        }

        $validated['user_id'] = $user->id;
        $portfolio = Portfolio::create($validated);

        // Response
        return response()->json([
            "message" => "Portfolio created sucessfully",
            "data" => $portfolio,
        ], 201);
    }
}
