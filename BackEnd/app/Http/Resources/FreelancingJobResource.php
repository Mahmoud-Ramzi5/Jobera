<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreelancingJobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $defJob = $this->defJob;

        $company = Company::where('user_id', $this->user_id)->first();
        $individual = Individual::where('user_id', $this->user_id)->first();

        $acceptedCompany = Company::where('user_id', $this->accepted_user)->first();
        $acceptedIndividual = Individual::where('user_id', $this->accepted_user)->first();

        return [
            "id" => $this->id,
            "defJob_id" => $defJob->id,
            "title" => $defJob->title,
            "description" => $defJob->description,
            "type" => "Freelancing",
            "photo" => $defJob->photo,
            "is_done" => $defJob->is_done,
            "min_salary" => $this->min_salary,
            "max_salary" => $this->max_salary,
            "deadline" => $this->deadline,
            "avg_salary" => $this->avg_salary,
            "job_user" => $company == null ? [
                'id' => $individual->id,
                'user_id' => $individual->user_id,
                'name' => $individual->full_name,
                'type' => $individual->type,
                'avatar_photo' => $individual->avatar_photo
            ] : [
                'id' => $company->id,
                'user_id' => $company->user_id,
                'name' => $company->name,
                'type' => $company->type,
                'avatar_photo' => $company->avatar_photo
            ],
            "accepted_user" => $acceptedCompany == null ? [
                'id' => $acceptedIndividual->id,
                'user_id' => $acceptedIndividual->user_id,
                'name' => $acceptedIndividual->full_name,
                'type' => $acceptedIndividual->type,
                'avatar_photo' => $acceptedIndividual->avatar_photo
            ] : [
                'id' => $acceptedCompany->id,
                'user_id' => $acceptedCompany->user_id,
                'name' => $acceptedCompany->name,
                'type' => $acceptedCompany->type,
                'avatar_photo' => $acceptedCompany->avatar_photo
            ],
            "competitors" => new FreelancingJobCompetitorCollection($this->competitors),
            "skills" => new SkillCollection($this->skills),
            "state" => $defJob->state
        ];
    }
}
