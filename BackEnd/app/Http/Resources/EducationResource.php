<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "level" => $this->level,
            "field" => $this->field,
            "school" => $this->school,
            "start_date" => $this->start_date,
            "end_date" => $this->end_date,
            //"certificate_file" => mb_convert_encoding(File::get(storage_path('app/'.$this->certificate_file)), 'UTF-8', 'UTF-8'),
        ];
    }
}
