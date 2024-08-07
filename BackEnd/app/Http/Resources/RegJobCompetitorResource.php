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
            "user" => [
                'user_id' => $this->individual->user_id,
                'name' => $this->individual->full_name,
                'rating' => number_format($this->individual->user->reviewedBy->avg('review'), 2, '.', ''),
                'avatar_photo' => $this->individual->user->avatar_photo,
            ],
            "description" => $this->description,
            "job_type" => $this->regJob->type
        ];
    }
}
