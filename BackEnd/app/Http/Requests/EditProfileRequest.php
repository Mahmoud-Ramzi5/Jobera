<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EditProfileRequest extends FormRequest
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
            // User
            'phone_number' => ['sometimes', Rule::unique('users')->ignore($this->user()->id), 'min:11', 'max:13', 'regex:/^\+/'],
            'state_id' => ['sometimes'],
            // Individual
            'full_name' => ['sometimes'],
            // Company
            'name' => ['sometimes'],
            'field' => ['sometimes'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'error' => $validator->errors()
        ], 422));
    }
}
