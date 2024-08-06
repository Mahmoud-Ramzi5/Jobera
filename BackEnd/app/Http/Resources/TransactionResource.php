<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $sender = User::where('id', $this->sender->user->id)->first();
        $receiver = User::where('id', $this->receiver->user->id)->first();
        $individualSender = Individual::where('user_id', $sender->id)->first();
        $individualReceiver = Individual::where('user_id', $receiver->id)->first();
        $CompanySender = Company::where('user_id', $sender->id)->first();
        $CompanyReceiver = Company::where('user_id', $receiver->id)->first();
        $senderName = $individualSender ? $individualSender->full_name : $CompanySender->name;
        $receiverName = $individualReceiver ? $individualReceiver->full_name : $CompanyReceiver->name;
        return [
            "sender" => [
                "id" => $sender->id,
                "name" => $senderName,
            ],
            "receiver" => [
                "id" => $receiver->id,
                "name" => $receiverName,
            ],
            "job" => [
                "id" => $this->defJob_id,
                "title" => $this->freelancing_job->title,
            ],
            "amount" => $this->amount,
            "date" => $this->date,
        ];
    }
}
