<?php

namespace Database\Factories;

use App\Models\DefJob;
use App\Models\RegJob;
use App\Models\Review;
use App\Models\Wallet;
use App\Models\Company;
use App\Models\Individual;
use App\Models\Transaction;
use App\Models\RegJobCompetitor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RegJob>
 */
class RegJobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Define some example data
        return [
            'salary' => $this->faker->numberBetween(2000, 8000),
            'type' => $this->faker->randomElement(['PartTime', 'FullTime']),
            'company_id' => Company::inRandomOrder()->first()->id,
            'defJob_id' => DefJob::factory()->withSkills(),
            'accepted_individual' => Individual::inRandomOrder()->first()->id,
        ];
    }

    public function withCompetitors()
    {
        return $this->afterCreating(function (RegJob $regJob) {
            // recieve balance from company
            $wallet = Wallet::where('user_id', $regJob->company->user_id)->first();
            $wallet->total_balance -= $regJob->salary * 0.10;
            $wallet->available_balance -= $regJob->salary * 0.10;
            $wallet->save();

            $admin = Wallet::where('user_id', 1)->first();
            $admin->total_balance += $regJob->salary * 0.10;
            $admin->available_balance += $regJob->salary * 0.10;
            $admin->save();
            $transactionParams = [
                'sender_id' => $wallet->id,
                'receiver_id' => 1,
                'defJob_id' => $regJob->defJob_id,
                'amount' => $regJob->salary * 0.10,
                'date' => now()
            ];
            Transaction::create($transactionParams);

            // Add two random competitors
            RegJobCompetitor::factory()->count(2)->create([
                'job_id' => $regJob->id,
            ]);

            // Add one competitor with the same ID as the accepted Individual
            RegJobCompetitor::factory()->create([
                'job_id' => $regJob->id,
                'individual_id' => $regJob->accepted_individual,
            ]);
        });
    }
    public function withRating()
    {
        return $this->afterCreating(function (RegJob $regJob) {
            $reviewer_id = $regJob->company->user_id;
            $reviewed_id = $regJob->acceptedIndividual->user_id;
            $review = $this->faker->numberBetween(1, 5);
            Review::create([
                'reviewer_id'=>$reviewer_id,
                'reviewed_id'=>$reviewed_id,
                'review'=>$review
            ]);
        });
    }
}
