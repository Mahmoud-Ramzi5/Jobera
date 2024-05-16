<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\PortfolioSkills;
use App\Models\PortfolioFile;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Requests\AddPortfolioRequest;
use App\Http\Requests\EditPortfolioRequest;
use App\Http\Resources\PortfolioResource;
use App\Http\Resources\PortfolioCollection;

class PortfolioController extends Controller
{
    public function ShowUserPortfolios()
    {
        // Get User
        $user = auth()->user();
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

    public function AddPortfolio(AddPortfolioRequest $request)
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
        $data = Arr::except($data, 'skills');
        $data = Arr::except($data, 'files');
        $portfolio = Portfolio::create($data);

        // Save the associated skills
        foreach ($validated['skills'] as $skillData) {
            $skill = PortfolioSkills::create([
                'portfolio_id' => $portfolio->id,
                'skill_id' => $skillData
            ]);
        }

        // Handle file uploads if present in the request
        if ($request->hasFile('files')) {
            $files = $request->file('files');

            foreach ($files as $file) {
                $filePath = $file->store('portfolio_files');

                // Create and associate a new file instance with the portfolio
                $portfolioFile = new PortfolioFile();
                $portfolioFile->file = $filePath;
                $portfolio->files()->save($portfolioFile);
            }
        }

        // Response
        return response()->json([
            "message" => "Portfolio created sucessfully",
            "data" => new PortfolioResource($portfolio),
        ], 201);
    }

    public function EditPortfolio(EditPortfolioRequest $request, Portfolio $portfolio)
    {
        // Validate request
        $validated = $request->validated();

        // Handle photo file
        if ($request->hasFile('photo')) {
            $Path = $request->file('photo')->store('avatars', 'public');
            $validated['photo'] = $Path;
        }
        $portfolio->update($validated);

        // Save the associated skills
        $skills = $validated['skills'];
        $portfolioSkills = $portfolio->skills()->get();
        foreach($skills as $skill){
            if(!in_array($portfolioSkills,$skill)) {
                $portfolio->skills()->attach($skill);
            }
        }

        // Handle files
        if ($request->hasFile('files')) {
            $files = $request->file('files');

            foreach ($files as $file) {
                $filePath = $file->store('portfolio_files');

                // Create and associate a new file instance with the portfolio
                $portfolioFile = new PortfolioFile();
                $portfolioFile->file_path = $filePath;
                $portfolio->files()->save($portfolioFile);
            }
        }

        // Response
        return response()->json([
            "message" => "Portfolio updated sucessfully",
            "data" => new PortfolioResource($portfolio),
        ], 200);
    }

    public function DeletePortfolio(Request $request, Portfolio $portfolio)
    {
        $portfolio->delete();

        return response()->json([
            "message" => "Portfolio deleted",
        ], 202);
    }
}
