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
            "id" => $this->id,
            "defJob_id" => $defJob->id,
            "title" => $defJob->title,
            "description" => $defJob->description,
            "photo" => $defJob->photo,
            "is_done" => $defJob->is_done,
            "salary" => $this->salary,
            "type" => $this->type,
            "company" => [
                "id" => $this->company->id,
                'user_id' => $this->company->user_id,
                "name" => $this->company->name,
                'avatar_photo' => $this->company->avatar_photo,
                'wallet' =>$this->company->user->wallet
            ],
            "accepted_individual" => $this->acceptedIndividual != null ? [
                'id' => $this->acceptedIndividual->id,
                'user_id' => $this->acceptedIndividual->user_id,
                'full_name' => $this->acceptedIndividual->full_name,
                'type' => $this->acceptedIndividual->type,
                'avatar_photo' => $this->acceptedIndividual->avatar_photo
            ] : null,
            "competitors" => new RegJobCompetitorCollection($this->competitors),
            "skills" => new SkillCollection($this->skills),
            'location' => $defJob->state != null ? [
                'state' => $defJob->state->state_name,
                'country' => $defJob->state->country->country_name
            ] : null,
            'publish_date' => $defJob->created_at
        ];
    }
}
