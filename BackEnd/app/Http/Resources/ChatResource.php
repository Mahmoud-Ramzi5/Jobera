<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $company = Company::where('user_id', $this->user1_id)->first();
        $individual = Individual::where('user_id', $this->user1_id)->first();
        if ($company == null) {
            $user1 = new IndividualResource($individual);
        } else {
            $user1 = new CompanyResource($company);
        }
        $company = Company::where('user_id', $this->user2_id)->first();
        $individual = Individual::where('user_id', $this->user2_id)->first();
        if ($company == null) {
            $user2 = new IndividualResource($individual);
        } else {
            $user2 = new CompanyResource($company);
        }
        return [
            "id"=>$this->id,
            "user1"=>$user1,
            "user2"=>$user2,
            "messages"=>$this->messages
        ];
    }
}
