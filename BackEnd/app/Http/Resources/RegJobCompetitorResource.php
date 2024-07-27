<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegJobCompetitorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "competitor_id" => $this->id,
            "individual" => [
                'user_id' => $this->individual->user_id,
                'full_name' => $this->individual->full_name,
                'rating' => $this->individual->user->rating,
                'avatar_photo' => $this->individual->user->avatar_photo,
            ],
            "description" => $this->description,
            "job_type" => $this->regJob->type
        ];
    }
}
