<?php

namespace App\Http\Resources;

use App\Models\RegJob;
use Illuminate\Http\Request;
use App\Models\FreelancingJob;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $count=0;
        $regJobs = RegJob::all();
        $freelancingJobs = FreelancingJob::all();
        foreach ($regJobs as $regJob) {
            foreach ($regJob->defJob->skills as $skill) {
                if($skill->name==$this->name)
                    $count++;
            }
        }

        foreach ($freelancingJobs as $freelancingJob) {
            foreach ($freelancingJob->defJob->skills as $skill) {
                if($skill->name==$this->name)
                    $count++;
            }
        }

        return [
            "id" => $this->id,
            "name" => $this->name,
            "type" => $this->type,
            "count"=>$count
        ];
    }
}
