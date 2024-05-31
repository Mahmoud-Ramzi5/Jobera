<?php

namespace App\Http\Resources;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\RegJobCompetetor;
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
        $company=$this->company()->first();
        $competetors=RegJobCompetetor::where('job_id',$this->id)->get();
        $job=$this->job()->first();
        return [
            "id"=>$this->id,
            "title"=>$job->title,
            "company"=>new CompanyResource($company),
            "description"=>$job->description,
            "salary"=>$this->salary,
            "type"=>$this->type,
            "isDone"=>$job->isDone,
            'photo'=>$job->photo,
            "accepted_individual"=>new IndividualResource($this->accepted_individual),
            "competetors"=>new JobCompetetorsResource($competetors)
        ];
    }
}
