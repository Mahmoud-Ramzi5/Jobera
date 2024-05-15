<?php

namespace App\Http\Resources;

use App\Models\Individual;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobCompetetorsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $individual=Individual::where('id',$this->individual_id)->get();
        return [
            "id"=>$this->id,
            "individual"=>new IndividualResource($individual),
            "job_id"=>$this->job_id,
            "description"=>$this->description
        ];
    }
}
