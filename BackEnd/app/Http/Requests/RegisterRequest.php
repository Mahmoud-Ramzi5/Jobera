<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\IndividualGender;
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
            'full_name' => ['required'],
            'email' => ['required', 'unique:users', 'email'],
            'phone_number' => ['required', 'unique:users', 'min:11', 'max:13', 'regex:/^\+/'],
            'password' => ['required'],
            'confirm_password' => ['required', 'same:password'],
            'state_id' => ['required'],
            'birth_date' => ['required', 'date'],
            'gender' => ['required', Rule::in(IndividualGender::names())],
            'type' => ['required', 'in:admin,individual'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
