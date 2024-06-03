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
        if ($company == null) {
            $posterResource = new IndividualResource($individual);
        } else {
            $posterResource = new CompanyResource($company);
        }

        $acceptedCompany = Company::where('user_id', $this->accepted_user)->first();
        $acceptedIndividual = Individual::where('user_id', $this->accepted_user)->first();
        if ($acceptedCompany == null) {
            $acceptedResource = new IndividualResource($acceptedIndividual);
        } else {
            $acceptedResource = new CompanyResource($acceptedCompany);
        }

        return [
            "id" => $this->id,
            "title" => $defJob->title,
            "description" => $defJob->description,
            "photo" => $defJob->photo,
            "is_done" => $defJob->is_done,
            "min_salary" => $this->min_salary,
            "max_salary" => $this->max_salary,
            "deadline" => $this->deadline,
            "avg_salary" => $this->avg_salary,
            "job_user" => $posterResource,
            "accepted_user" => $acceptedResource,
            "competetors" => new FreelancingJobCompetetorCollection($this->competetors),
            "skills" => new SkillCollection($this->skills)
        ];
    }
}
