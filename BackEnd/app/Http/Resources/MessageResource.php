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
        $company1 = Company::select('user_id', 'name')->with('user:id,avatar_photo')
            ->where('user_id', $this->sender_id)->first();
        $individual1 = Individual::select('user_id', 'full_name AS name')->with('user:id,avatar_photo')
            ->where('user_id', $this->sender_id)->first();
        if ($company1 == null) {
            $Sender = $individual1;
        } else {
            $Sender = $company1;
        }

        // Get Receiver details
        $company2 = Company::select('user_id', 'name')->with('user:id,avatar_photo')
            ->where('user_id', $this->receiver_id)->first();
        $individual2 = Individual::select('user_id', 'full_name AS name')->with('user:id,avatar_photo')
            ->where('user_id', $this->receiver_id)->first();
        if ($company2 == null) {
            $Receiver = $individual2;
        } else {
            $Receiver = $company2;
        }

        return [
            'id' => $this->id,
            'chat_id' => $this->chat_id,
            'message' => $this->message,
            'sender' => [
                'user_id' => $Sender->user_id,
                'name' => $Sender->name,
                'avatar_photo' => $Sender->user->avatar_photo
            ],
            'Receiver' => [
                'user_id' => $Receiver->user_id,
                'name' => $Receiver->name,
                'avatar_photo' => $Receiver->user->avatar_photo,
                "read_at" => $this->read_at
            ],
            'send_date' => $this->created_at
        ];
    }
}
