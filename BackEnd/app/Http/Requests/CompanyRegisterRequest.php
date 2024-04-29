<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CompanyRegisterRequest extends FormRequest
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
            'name' => ['required'],
            'field' => ['required'],
            'email' => ['required', 'unique:users', 'email'],
            'phone_number' => ['required', 'unique:users', 'unique:companies', 'min:11', 'max:13', 'regex:/^\+/'],
            'password' => ['required'],
            'confirm_password' => ['required', 'same:password'],
            'state_id' => ['required'],
            'avatar_photo' => ['sometimes', 'image', 'max:4096'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
