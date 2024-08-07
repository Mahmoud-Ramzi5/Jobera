<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "type" => "admin",
            "user_id" => $this->id,
            'wallet' => $this->wallet,
            'avatar_photo' => $this->avatar_photo,
        ];
    }
}
