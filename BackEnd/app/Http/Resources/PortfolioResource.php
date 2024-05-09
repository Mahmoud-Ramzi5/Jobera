<?php

namespace App\Http\Resources;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Get portfolio skills
        $skills = [];
        foreach($this->skills as $skill) {
            $Skill = Skill::find($skill->skill_id);
            array_push($skills, $Skill);
        }

        return [
            "id" => $this->id,
            "title" => $this->title,
            "description" => $this->description,
            "link" => $this->link,
            "photo" => $this->photo,
            "files" => $this->files,
            "skills" => new SkillCollection($skills),
            "user_id" => $this->user_id,
        ];
    }
}
