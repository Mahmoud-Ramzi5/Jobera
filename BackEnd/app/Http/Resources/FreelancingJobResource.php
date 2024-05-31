<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use Illuminate\Http\Request;
use App\Http\Resources\CompanyResource;
use App\Models\FreelancingJobCompetetor;
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
        $user = $this->user()->first();
        $competetors = FreelancingJobCompetetor::where('job_id', $this->id)->get();
        $job = $this->job()->first();
        $company = Company::where('user_id', $user->id)->first();
        $individual = Individual::where('user_id', $user->id)->first();
        if ($company == null) {
            $posterResource = new IndividualResource($individual);
        } else {
            $posterResource = new CompanyResource($company);
        }
        $acceptedCompany = Company::where('user_id', $this->acceptedUser)->first();
        $acceptedIndividual = Individual::where('user_id', $this->acceptedUser)->first();
        if ($acceptedCompany == null) {
            $acceptedResource = new IndividualResource($acceptedIndividual);
        } else {
            $acceptedResource = new CompanyResource($acceptedIndividual);
        }
        return [
            "id" => $this->id,
            "title" => $job->title,
            "description" => $job->description,
            "isDone" => $job->isDone,
            'photo' => $job->photo,
            "competetors" => new JobCompetetorsResource($competetors),
            "job user" => $posterResource,
            "accepted_user" => $acceptedResource,
            'min_salary' => $this->min_salary,
            'max_salary' => $this->max_salary,
            'deadline' => $this->deadline,
            'avg_salary' => $this->avg_salary,
        ];
    }
}
