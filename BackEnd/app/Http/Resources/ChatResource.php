<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use Illuminate\Support\Arr;
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
        $user = auth()->user();

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

        if ($user->id == $this->user1_id) {
            $otherUser = $user2;
            // $sender = $user1;
            // $reciver = $user2;
        } else {
            $otherUser = $user1;
            // $reciver = $user2;
            // $sender = $user1;
        }

        return [
            'id' => $this->id,
            'other_user' => [
                'name' => ($otherUser->type == "individual" ?
                    $otherUser->full_name : $otherUser->name),
                'avatar_photo' => $otherUser->avatar_photo
            ],
            // "sender" => $sender,
            // "reciver" => $reciver,
            'messages' => new MessageCollection($this->messages),
            'last_message' => new MessageResource($this->messages->last())
        ];
    }
}
