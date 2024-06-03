<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            "is_done" => ["required", "boolean"],
            "title" => ["required"],
            "description" => ["required"],
            'photo' => ["sometimes", "image", "max:4096"],
            'min_salary' => ["required", "numeric"],
            'max_salary' => ["required", "numeric", "gt:min_salary"],
            'deadline' => ["required"],
            'skills' => ['required', 'array']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
