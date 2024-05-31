<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddFreelancingJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "isDone"=>["required","boolean"],
            "title"=>["required"],
            "description"=>["required"],
            'photo' => ['sometimes', 'image', 'max:4096'],
            'min_salary'=>["required",'integer'],
            'max_salary'=>["required","gt:min_salary",'integer'],
            'deadline'=>["required"],
        ];
    }
}
