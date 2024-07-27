<?php

namespace App\Http\Requests;

use App\Models\FreelancingJob;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ApplyFreelancingJobRequest extends FormRequest
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
        //$job = FreelancingJob::find($this->input('job_id'));
        return [
            'job_id' => ['required'],
            'description' => ['required'],
            'offer' => ['required', 'numeric'/*, "between:{$job->min_salary},{$job->max_salary}"*/]
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
