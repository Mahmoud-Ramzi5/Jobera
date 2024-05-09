<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Models\Portfolio;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Models\PortfolioFile;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use App\Http\Requests\AddPortfolioRequest;
use App\Http\Requests\EditPortfolioRequest;
use App\Http\Resources\CertificateResource;
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

    public function ShowPortfolio(Request $request, $id)
    {
        // Get portfolio
        $portfolio = Portfolio::find($id);

        // Response
        return response()->json([
            "portfolio" => new PortfolioResource($portfolio)
        ]);
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

        $validated['user_id'] = $user->id;
        $portfolio = Portfolio::create($validated);

        // Save the associated skills
        $skills = $validated['skills'];
        $portfolio->skills()->attach($skills);

        // Handle file uploads if present in the request

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
            "message" => "Portfolio created sucessfully",
            "data" => new PortfolioResource($portfolio),
        ], 201);
    }
    public function ShowPortifolio(Request $request, Portfolio $portfolio)
    {
        return response()->json([
            "data" => new PortfolioResource($portfolio)
        ]);
    }
    public function AllPortifolios()
    {
        // Get User
        $user = auth()->user();
        if ($user == null) {
            return response()->json([
                "message" => "user not found"
            ], 401);
        }

        $portfolios = $user->portifolios()->get();

        // Response
        return response()->json([
            "data" => new PortfolioCollection($portfolios),
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
        $portSkills=$portfolio->skills()->get();
        foreach($skills as $skill){
            if(! in_array($portSkills,$skill)){
                $portfolio->skills()->attach($skill);
            }
        }
        //handle files
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
        ], 201);
    }
}
