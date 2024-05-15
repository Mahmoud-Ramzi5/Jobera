<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\JobCompetetor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = auth()->user();
        $company=Company::where('user_id',$user->id)->get();
        $competetors=JobCompetetor::where('job_id',$this->id)->get();
        return [
            "id"=>$this->id,
            "title"=>$this->title,
            "company"=>new CompanyResource($company),
            "description"=>$this->description,
            "salary"=>$this->salary,
            "type"=>$this->type,
            "isDone"=>$this->isDone,
            "accepted_individual"=>$this->accepted_individual,
            "competetors"=>new JobCompetetorsResource($competetors)
        ];
    }
}
