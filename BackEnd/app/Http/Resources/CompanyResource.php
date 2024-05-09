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
        $user = $this->user()->first();
        $is_verified = false;
        if ($user->email_verified_at) {
            $is_verified = true;
        }
        $portfolios=$user->portfolios()->get();
        return [
            'name' => $this->name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'country' => $user->state->country->country_name,
            'state' => $user->state->state_name,
            'date' => $this->birth,
            'field' => $this->field,
            'description' => $this->description,
            'avatar_photo' => $this->avatar_photo,
            'portfolios' => new PortfolioCollection($user->portfolios),
            'is_verifed' => $is_verified,
        ];
    }
}
