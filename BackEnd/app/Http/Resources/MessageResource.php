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
        // Get Sender details
        $company = Company::where('user_id', $this->user_id)->first();
        $individual = Individual::where('user_id', $this->user_id)->first();
        if ($company == null) {
            $SenderResource = new IndividualResource($individual);
        } else {
            $SenderResource = new CompanyResource($company);
        }

        return [
            'id' => $this->id,
            'chat_id' => $this->chat_id,
            'message' => $this->message,
            'user' => [
                'user_id' => $SenderResource->user_id,
                'name' => ($SenderResource->type == "individual" ?
                    $SenderResource->full_name : $SenderResource->name),
                'avatar_photo' => $SenderResource->avatar_photo
            ],
            'send_date' => $this->created_at
        ];
    }
}
