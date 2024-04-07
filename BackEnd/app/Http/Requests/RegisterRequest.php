<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            'fullName' => ['required'],
            'email' => ['required', 'unique:users', 'email'],
            'phoneNumber' => ['required', 'unique:users', 'min:12', 'max:14'],
            'password' => ['required'],
            'confirmPassword' => ['required', 'same:password'],
            'country' => ['required'],
            'state' => ['required'],
            'birthDate' => ['required', 'date'],
            'gender' => ['required', 'in:male,female'],
            'type'=>['required','in:admin,indvidual'],
            'avatarPhoto' => ['sometimes', 'image', 'max:4096'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
