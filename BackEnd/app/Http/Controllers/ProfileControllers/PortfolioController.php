<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\PortfolioFile;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\PortfolioRequest;
use App\Http\Resources\PortfolioResource;
use App\Http\Resources\PortfolioCollection;

class PortfolioController extends Controller
{
    public function ShowUserPortfolios()
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Get user's portfolios
        $portfolios = $user->portfolios;

        // Response
        return response()->json([
            "portfolios" => new PortfolioCollection($portfolios)
        ], 200);
    }

    public function ShowPortfolio(Request $request, Portfolio $portfolio)
    {
        return response()->json([
            "portfolio" => new PortfolioResource($portfolio)
        ], 200);
    }

    public function AddPortfolio(PortfolioRequest $request)
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

        // Handle photo file
        if ($request->hasFile('photo')) {
            $Path = $request->file('photo')->store('avatars', 'public');
            $validated['photo'] = $Path;
        }

        $data = $validated;
        $data['user_id'] = $user->id;
        $data = Arr::except($data, 'files');
        $data = Arr::except($data, 'skills');
        $portfolio = Portfolio::create($data);

        // Save the associated skills
        $portfolio->skills()->attach($validated['skills']);

        // Handle file uploads if present in the request
        if ($request->hasFile('files')) {
            $files = $request->file('files');

            foreach ($files as $file) {
                $filePath = $file->store('portfolio_files');

                // Create and associate a new file instance with the portfolio
                $portfolioFile = PortfolioFile::create([
                    'file' => $filePath,
                    'portfolio_id' => $portfolio->id
                ]);
            }
        }

        // Response
        return response()->json([
            "message" => "Portfolio created sucessfully",
            "data" => new PortfolioResource($portfolio)
        ], 201);
    }

    public function EditPortfolio(PortfolioRequest $request, Portfolio $portfolio)
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

        // Check if portfolio belongs to user
        if($user->id != $portfolio->user_id) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Handle photo file
        if ($request->hasFile('photo')) {
            $Path = $request->file('photo')->store('avatars', 'public');
            $validated['photo'] = $Path;
        }

        $data = $validated;
        $data = Arr::except($data, 'files');
        $data = Arr::except($data, 'skills');
        $portfolio->update($data);

        // Save the associated skills
        $skills = $validated['skills'];
        $currentSkills = $portfolio->skills()->pluck('skill_id')->toArray();

        // Determine the skills to remove
        $skillsToRemove = array_diff($currentSkills, $validated['skills']);

        // Remove the skills that are not in the validated skills
        $portfolio->skills()->whereIn('skill_id', $skillsToRemove)->delete();

        // Add the new skills
        foreach($skills as $skill) {
            if(!in_array($skill, $currentSkills)) {
                $portfolio->skills()->attach($skill);
            }
        }

        // Save skills
        $portfolio->save();

        // Handle file uploads if present in the request
        if ($request->hasFile('files')) {
            $files = $request->file('files');

            $currentFiles = $portfolio->files;
            foreach ($files as $file) {
                if (!in_array($currentFiles, $file)) {
                    $filePath = $file->store('portfolio_files');

                    // Create and associate a new file instance with the portfolio
                    $portfolioFile = PortfolioFile::create([
                        'file' => $filePath,
                        'portfolio_id' => $portfolio->id
                    ]);
                }
            }
        }

        // Response
        return response()->json([
            "message" => "Portfolio updated sucessfully",
            "data" => new PortfolioResource($portfolio)
        ], 200);
    }

    public function DeletePortfolio(Request $request, Portfolio $portfolio)
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Check if portfolio belongs to user
        if($user->id != $portfolio->user_id) {
            return response()->json([
                'user' => 'Invalid user'
            ], 401);
        }

        // Delete portfolio
        $portfolio->delete();

        // Response
        return response()->json([
            "message" => "Portfolio deleted",
        ], 202);
    }
}
