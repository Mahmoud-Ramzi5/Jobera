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
            "id" => $this->id,
            "individual" => [
                'id' => $this->individual->id,
                'user_id' => $this->individual->user_id,
                'full_name' => $this->individual->full_name,
                'type' => $this->individual->type,
                'avatar_photo' => $this->individual->avatar_photo,
            ],
            "description" => $this->description,
            "job_type" => $this->regJob->type
        ];
    }
}
