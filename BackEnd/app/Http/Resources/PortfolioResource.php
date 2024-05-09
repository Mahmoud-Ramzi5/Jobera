<?php

namespace App\Http\Resources;

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
        $skills=$this->skills()->get();
        $files=$this->files()->get();
        return [
            "id"=>$this->id,
            "title"=>$this->title,
            "description"=>$this->description,
            "link"=>$this->link,
            "photo"=>$this->photo,
            "user_id"=>$this->user_id,
            "skills"=>$skills,
            "files"=>$files
        ];
    }
}
