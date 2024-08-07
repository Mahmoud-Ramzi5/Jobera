<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Models\Company;
use App\Models\Individual;
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
        $sender = User::select('id')->where('id', $this->sender->user->id)->first();
        $receiver = User::select('id')->where('id', $this->receiver->user->id)->first();
        $individualSender = Individual::select('full_name')->where('user_id', $sender->id)->first();
        $individualReceiver = Individual::select('full_name')->where('user_id', $receiver->id)->first();
        $CompanySender = Company::select('name')->where('user_id', $sender->id)->first();
        $CompanyReceiver = Company::select('name')->where('user_id', $receiver->id)->first();
        $senderName = $individualSender ? $individualSender->full_name : $CompanySender->name;
        $receiverName = $individualReceiver ? $individualReceiver->full_name : $CompanyReceiver->name;
        return [
            "id" => $this->id,
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
                "title" => $this->def_job->title,
            ],
            "amount" => $this->amount,
            "date" => $this->date,
        ];
    }
}
