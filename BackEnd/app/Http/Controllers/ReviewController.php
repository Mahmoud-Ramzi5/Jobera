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
        $userReview = [];
        $userReviews = Review::where('reviewed_id', $validated['reviewed_id'])->get()->all();
        $count = 0;
        $sumRating = 0;
        foreach ($userReviews as $userReview) {
            $sumRating += $userReview->review;
            $count += 1;
        }
        $rating = $sumRating / $count;
        $user = User::find($validated['reviewed_id']);
        $user->rating = $rating;
        $user->save();

        // Response
        return response()->json([
            'message' => 'rated successfully'
        ], 200);
    }
}
