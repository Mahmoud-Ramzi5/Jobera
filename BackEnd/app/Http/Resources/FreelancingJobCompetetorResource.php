<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreelancingJobCompetetorResource extends JsonResource
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
        if ($company == null) {
            $applierResource = new IndividualResource($individual);
        } else {
            $applierResource = new CompanyResource($company);
        }
        return [
            "id" => $this->id,
            "user" => $applierResource,
            "description" => $this->description,
            "salary" => $this->salary,
            "jobType"=>"Freelancing"
        ];
    }
}
