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
        $bookmarkedJobs = $user->bookmarkedJobs()->pluck('defJob_id')->toArray();

        return [
            "defJob_id" => $defJob->id,
            "title" => $defJob->title,
            "description" => $defJob->description,
            "type" => $this->type,
            "photo" => $defJob->photo,
            "is_done" => $defJob->is_done,
            "salary" => $this->salary,
            "job_user" => [
                'user_id' => $this->company->user_id,
                "name" => $this->company->name,
                'avatar_photo' => $this->company->user->avatar_photo,
                'wallet' => $this->company->user->wallet
            ],
            "accepted_user" => $this->acceptedIndividual != null ? [
                'user_id' => $this->acceptedIndividual->user_id,
                'name' => $this->acceptedIndividual->full_name,
                'avatar_photo' => $this->acceptedIndividual->user->avatar_photo
            ] : null,
            "competitors" => new RegJobCompetitorCollection($this->competitors),
            "skills" => new SkillCollection($defJob->skills),
            'location' => $defJob->state != null ? [
                'state' => $defJob->state->state_name,
                'country' => $defJob->state->country->country_name
            ] : null,
            'publish_date' => $defJob->created_at,
            "is_flagged" => in_array($defJob->id, $bookmarkedJobs) ? true : false
        ];
    }
}
