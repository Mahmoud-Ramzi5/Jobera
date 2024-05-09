<?php

namespace App\Http\Controllers\ProfileControllers;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
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
            "data" => new PortfolioResource($portfolio),
        ], 201);
    }


    public function EditPortfolio(EditPortfolioRequest $request,Portfolio $portfolio){
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
        $portfolio->update($validated);
        // Response
        return response()->json([
            "message" => "Portfolio updated sucessfully",
            "data" => new PortfolioResource($portfolio),
        ], 201);
    }
}
