<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndividualResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $this->user()->first();
        $is_verified = false;
        if ($user->email_verified_at) {
            $is_verified = true;
        }
        $portfolios=$user->portfolios()->get();
        $skills=$user->skills()->get();
        $education=$user->education()->get();
        $certificates=$user->certificates()->get();
        return [
            "email" => $user->email,
            "phone_number" => $user->phone_number,
            "country" => $user->state->country->country_name,
            "state" => $user->state->state_name,
            "is_verifed" => $is_verified,
            'full_name' => $this->full_name,
            'birth_date' => $this->birth_date,
            'gender' => $this->gender,
            'type' => $this->type,
            'description' => $this->description,
            'avatar_photo' => $this->avatar_photo,
            'portfolios'=>$portfolios,
            'skills'=>$skills,
            'education'=>$education,
            'certificates'=>new CertificateCollection($certificates)
        ];
    }
}
