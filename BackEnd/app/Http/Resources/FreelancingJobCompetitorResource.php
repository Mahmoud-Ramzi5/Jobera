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
            "competitor_id" => $this->id,
            "user" => $company == null ? [
                'user_id' => $individual->user_id,
                'name' => $individual->full_name,
                'type' => 'individual',
                'rating' => number_format($individual->user->reviewedBy->avg('review'), 2, '.', ''),
                'avatar_photo' => $individual->user->avatar_photo
            ] : [
                'user_id' => $company->user_id,
                'name' => $company->name,
                'type' => 'company',
                'rating' => number_format($company->user->reviewedBy->avg('review'), 2, '.', ''),
                'avatar_photo' => $company->user->avatar_photo
            ],
            "description" => $this->description,
            "offer" => $this->offer,
            "job_type" => "Freelancing"
        ];
    }
}
