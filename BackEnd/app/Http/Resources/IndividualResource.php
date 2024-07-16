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
        // Get user
        $user = $this->user;

        // Check user verification
        $is_verified = false;
        if ($user->email_verified_at) {
            $is_verified = true;
        }

        // Check user register status
        $is_registered = false;
        if (count($this->skills) != 0 && $this->education != null) {
            $is_registered = true;
        }

        return [
            'user_id' => $user->id,
            'full_name' => $this->full_name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'country' => $user->state->country->country_name,
            'state' => $user->state->state_name,
            'birth_date' => $this->birth_date,
            'gender' => $this->gender,
            'type' => 'individual',
            'description' => $user->description,
            'avatar_photo' => $user->avatar_photo,
            'rating' => $user->rating,
            'reviews' => $this->reviewedBy->count(),
            'wallet' => $user->wallet,
            'skills' => new SkillCollection($this->skills),
            'education' => new EducationResource($this->education),
            'certificates' => new CertificateCollection($this->certificates),
            'portfolios' => new PortfolioCollection($user->portfolios),
            'is_verified' => $is_verified,
            'is_registered' => $is_registered,
            'register_step' => $this->register_step()
        ];
    }
}
