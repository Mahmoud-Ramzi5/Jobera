<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $is_verified = false;
        if ($this->email_verified_at) {
            $is_verified = true;
        }
        return [
            "full_name" => $this->full_name,
            "email" => $this->email,
            "phone_number" => $this->phone_number,
            "country" => $this->state->country->country_name,
            "state" => $this->state->state_name,
            "birth_date" => $this->birth_date,
            "gender" => $this->gender,
            "description" => $this->description,
            "avatar_photo" => "http://127.0.0.1:8000/storage/$this->avatar_photo",
            "rating" => $this->rating,
            "is_verifed" => $is_verified
        ];
    }
}
