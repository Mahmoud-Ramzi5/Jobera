<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            $SenderResource = new IndividualResource($individual);
        } else {
            $SenderResource = new CompanyResource($company);
        }

        return [
            "id" => $this->id,
            "chat_id" => $this->chat_id,
            "message" => $this->message,
            "user" => $SenderResource,
            "send_date" => $this->created_at
        ];
    }
}
