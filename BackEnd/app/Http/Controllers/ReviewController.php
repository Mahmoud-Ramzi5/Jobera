<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    function MakeReview(Request $request)
    {
        $validated = $request->validate([
            'reviewer_id' => 'required',
            'reviewed_id' => 'required',
            'review' => 'required'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Review
        $review = Review::create($validated);

        // Check review
        if ($review == null) {
            return response()->json([
                'errors' => ['review' => 'raiting failed']
            ], 401);
        }

        // Response
        return response()->json([
            'message' => 'rated successfully'
        ], 200);
    }
}
