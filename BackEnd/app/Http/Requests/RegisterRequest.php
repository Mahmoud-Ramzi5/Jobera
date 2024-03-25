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
            'fullName'=>['required'],
            'email'=>['required','unique:users','email'],
            'password'=>['required'],
            'confirmPassword'=>['required','same:password'],
            'phoneNumber'=>['required','unique:users','min:12','max:14'],
            'avatarPhoto'=>['sometimes'],
            'gender'=>['required','in:male,female'],
            'birthDate'=>['required','date'],
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
