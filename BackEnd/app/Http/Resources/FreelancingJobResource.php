<?php

namespace App\Http\Resources;

use App\Models\Company;
use App\Models\Individual;
use App\Models\FreelancingJobCompetitor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreelancingJobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = auth()->user();
        $defJob = $this->defJob;

        $company = Company::where('user_id', $this->user_id)->first();
        $individual = Individual::where('user_id', $this->user_id)->first();

        $acceptedCompany = Company::where('user_id', $this->accepted_user)->first();
        $acceptedIndividual = Individual::where('user_id', $this->accepted_user)->first();
        $acceptedCompetitor = FreelancingJobCompetitor::where('user_id', $this->accepted_user)
            ->where('job_id', $this->id)->first();
        if ($acceptedCompany != null) {
            $acceptedUser = [
                'user_id' => $acceptedCompany->user_id,
                'name' => $acceptedCompany->name,
                'type' => 'company',
                'avatar_photo' => $acceptedCompany->user->avatar_photo,
                'salary' => $acceptedCompetitor ? $acceptedCompetitor->salary : 0.0
            ];
        } else if ($acceptedIndividual != null) {
            $acceptedUser = [
                'user_id' => $acceptedIndividual->user_id,
                'name' => $acceptedIndividual->full_name,
                'type' => 'individual',
                'avatar_photo' => $acceptedIndividual->user->avatar_photo,
                'salary' => $acceptedCompetitor ? $acceptedCompetitor->salary : 0.0
            ];
        } else {
            $acceptedUser = null;
        }

        // Get flagged jobs
        $flagedJobs = $user->FlagedJobs()->pluck('defJob_id')->toArray();

        // Get average salary
        if ($this->competitors()->exists()) {
            $totalSalary = $this->competitors()->sum('salary');
            $numCompetitors = $this->competitors()->count();
            $avg_salary = $totalSalary  / $numCompetitors;
        } else {
            $avg_salary = 0.0;
        }

        return [
            "defJob_id" => $defJob->id,
            "title" => $defJob->title,
            "description" => $defJob->description,
            "type" => "Freelancing",
            "photo" => $defJob->photo,
            "is_done" => $defJob->is_done,
            "min_salary" => $this->min_salary,
            "max_salary" => $this->max_salary,
            "deadline" => $this->deadline,
            "avg_salary" => $avg_salary,
            "job_user" => $company == null ? [
                'user_id' => $individual->user_id,
                'name' => $individual->full_name,
                'type' => 'individual',
                'avatar_photo' => $individual->user->avatar_photo,
                'wallet' => $individual->user->wallet
            ] : [
                'user_id' => $company->user_id,
                'name' => $company->name,
                'type' => 'company',
                'avatar_photo' => $company->user->avatar_photo,
                'wallet' => $company->user->wallet
            ],
            "accepted_user" => $acceptedUser,
            "competitors" => new FreelancingJobCompetitorCollection($this->competitors),
            "skills" => new SkillCollection($this->skills),
            'location' => $defJob->state != null ? [
                'state' => $defJob->state->state_name,
                'country' => $defJob->state->country->country_name
            ] : null,
            'publish_date' => $defJob->created_at,
            "is_flagged" => in_array($defJob->id, $flagedJobs) ? true : false
        ];
    }
}
