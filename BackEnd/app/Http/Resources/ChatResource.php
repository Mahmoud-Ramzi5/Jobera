<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Models\Company;
use App\Models\Individual;
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
        // Get Current user
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

        // Check Other User
        if ($user->id == $this->user1_id) {
            if ($this->user2_id == 1) {
                $other_user = [
                    'user_id' => 1,
                    'name' => 'Jobara',
                    'avatar_photo' => User::find($this->user2_id)->avatar_photo
                ];
            } else {
                $otherUser = $user2;
                $other_user = [
                    'user_id' => $otherUser->user_id,
                    'name' => ($otherUser->type == "individual" ?
                        $otherUser->full_name : $otherUser->name),
                    'avatar_photo' => $otherUser->avatar_photo
                ];
            }
        } else {
            if ($this->user1_id == 1) {
                $other_user = [
                    'user_id' => 1,
                    'name' => 'Jobara',
                    'avatar_photo' => User::find($this->user1_id)->avatar_photo
                ];
            } else {
                $otherUser = $user1;
                $other_user = [
                    'user_id' => $otherUser->user_id,
                    'name' => ($otherUser->type == "individual" ?
                        $otherUser->full_name : $otherUser->name),
                    'avatar_photo' => $otherUser->avatar_photo
                ];
            }
        }

        return [
            'id' => $this->id,
            'other_user' => $other_user,
            'messages' => new MessageCollection($this->messages),
        ];
    }
}
