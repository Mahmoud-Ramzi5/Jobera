<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isVerified=false;
        if($this->email_verified_at){
            $isVerified=true;
        }
        return [
            "fullName"=>$this->fullName,
            "email"=>$this->email,
            "phoneNumber"=>$this->phoneNumber,
            "country"=>$this->country,
            "city"=>$this->state,
            "birthDate"=>$this->birthDate,
            "gender"=>$this->gender,
            "avatarPhoto"=>"http://127.0.0.1:8000/storage/$this->avatarPhoto",
            "rating"=>$this->rating,
            "isVerifed"=>$isVerified
        ];
    }
}
