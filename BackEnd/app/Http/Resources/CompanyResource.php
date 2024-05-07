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
        $user = $this->user()->get();
        $is_verified = false;
        if ($user->email_verified_at) {
            $is_verified = true;
        }
        $portfolios=$user->portfolios()->get();
        return [
            "email" => $user->email,
            "phone_number" => $user->phone_number,
            "country" => $user->state->country->country_name,
            "state" => $user->state->state_name,
            "is_verifed" => $is_verified,
            'name' => $this->name,
            'field' => $this->field,
            'description' => $this->description,
            'avatar_photo' => $this->avatar_photo,
            'portfolios'=>$portfolios,
        ];
    }
}
