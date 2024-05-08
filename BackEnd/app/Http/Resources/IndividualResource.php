<?php

namespace App\Http\Resources;

use App\Models\Skill;
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
        $user = $this->user()->first();

        // Check user verification
        $is_verified = false;
        if ($user->email_verified_at) {
            $is_verified = true;
        }

        // Get user skills
        $skills = [];
        foreach($user->skills as $skill) {
            $Skill = Skill::find($skill->skill_id);
            array_push($skills, $Skill);
        }

        $is_registered = false;
        if(count($skills) != 0 && $user->education != null) {
            $is_registered = true;
        }

        return [
            'full_name' => $this->full_name,
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'country' => $user->state->country->country_name,
            'state' => $user->state->state_name,
            'birth_date' => $this->birth_date,
            'gender' => $this->gender,
            'type' => $this->type,
            'description' => $this->description,
            'avatar_photo' => $this->avatar_photo,
            'skills' => new SkillCollection($skills),
            'education' => $user->education,
            'certificates' => new CertificateCollection($user->certificates),
            'portfolios' => $user->portfolios,
            'is_verifed' => $is_verified,
            'is_registered' => $is_registered
        ];
    }
}
