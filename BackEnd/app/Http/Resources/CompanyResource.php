<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Get user
        $user = $this->user;

        // Check user verification
        $is_verified = false;
        if ($user->email_verified_at) {
            $is_verified = true;
        }

        return [
            'user_id' => $user->id,
            'name' => $this->name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'country' => $user->state->country->country_name,
            'state' => $user->state->state_name,
            'field' => $this->field,
            'founding_date' => $this->founding_date,
            'type' => 'company',
            'description' => $user->description,
            'avatar_photo' => $user->avatar_photo,
            'rating' => number_format($user->reviewedBy->avg('review'), 2, '.', ''),
            'reviews' => $user->reviewedBy->count(),
            'wallet' => $user->wallet,
            'portfolios' => new PortfolioCollection($user->portfolios),
            'is_verified' => $is_verified,
            'notifications_count' => $user->unreadNotifications()->count()
        ];
    }
}
