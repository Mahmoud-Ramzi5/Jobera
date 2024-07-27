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
        $user = auth()->user();
        $defJob = $this->defJob;

        // Get flagged jobs
        $flagedJobs = $user->FlagedJobs()->pluck('defJob_id')->toArray();

        return [
            "defJob_id" => $defJob->id,
            "title" => $defJob->title,
            "description" => $defJob->description,
            "photo" => $defJob->photo,
            "is_done" => $defJob->is_done,
            "salary" => $this->salary,
            "type" => $this->type,
            "company" => [
                'user_id' => $this->company->user_id,
                "name" => $this->company->name,
                'avatar_photo' => $this->company->user->avatar_photo,
                'wallet' => $this->company->user->wallet
            ],
            "accepted_individual" => $this->acceptedIndividual != null ? [
                'user_id' => $this->acceptedIndividual->user_id,
                'full_name' => $this->acceptedIndividual->full_name,
                'avatar_photo' => $this->acceptedIndividual->user->avatar_photo
            ] : null,
            "competitors" => new RegJobCompetitorCollection($this->competitors),
            "skills" => new SkillCollection($this->skills),
            'location' => $defJob->state != null ? [
                'state' => $defJob->state->state_name,
                'country' => $defJob->state->country->country_name
            ] : null,
            'publish_date' => $defJob->created_at,
            "is_flagged" => in_array($defJob->id, $flagedJobs) ? true : false
        ];
    }
}
