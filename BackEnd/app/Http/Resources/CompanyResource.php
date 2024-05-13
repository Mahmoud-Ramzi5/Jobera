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
        $user = $this->user()->first();

        // Check user verification
        $is_verified = false;
        if ($user->email_verified_at) {
            $is_verified = true;
        }

        return [
            'name' => $this->name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'country' => $user->state->country->country_name,
            'state' => $user->state->state_name,
            'field' => $this->field,
            'founding_date' => $this->founding_date,
            'type' => 'company',
            'description' => $this->description,
            'avatar_photo' => $this->avatar_photo,
            'portfolios' => new PortfolioCollection($user->portfolios),
            'is_verifed' => $is_verified,
        ];
    }
}
