<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegJobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $defJob = $this->defJob;

        return [
            "id" => $defJob->id,
            "title" => $defJob->title,
            "description" => $defJob->description,
            "photo" => $defJob->photo,
            "is_done" => $defJob->is_done,
            "salary" => $this->salary,
            "type" => $this->type,
            "company" => new CompanyResource($this->company),
            "accepted_individual" => new IndividualResource($this->acceptedIndividual),
            "competetors" => new RegJobCompetetorCollection($this->competetors)
        ];
    }
}
