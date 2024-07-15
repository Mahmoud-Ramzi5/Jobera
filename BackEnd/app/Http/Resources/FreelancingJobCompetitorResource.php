<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreelancingJobCompetitorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $company = Company::where('user_id', $this->user_id)->first();
        $individual = Individual::where('user_id', $this->user_id)->first();

        return [
            "id" => $this->id,
            "user" => $company == null ? [
                'id' => $individual->id,
                'user_id' => $individual->user_id,
                'name' => $individual->full_name,
                'type' => $individual->type,
                'rating' => $individual->rating,
                'avatar_photo' => $individual->avatar_photo
            ] : [
                'id' => $company->id,
                'user_id' => $company->user_id,
                'name' => $company->name,
                'type' => $company->type,
                'rating' => $company->rating,
                'avatar_photo' => $company->avatar_photo
            ],
            "description" => $this->description,
            "salary" => $this->salary,
            "job_type" => "Freelancing"
        ];
    }
}
