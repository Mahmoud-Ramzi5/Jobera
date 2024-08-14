<?php

namespace Database\Seeders;

use App\Models\Wallet;
use App\Models\FreelancingJob;
use App\Models\FreelancingJobCompetitor;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FreelancingJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FreelancingJob::factory()
            ->count(15)
            ->withCompetitors()
            ->create();

        FreelancingJob::factory()
            ->count(5)
            ->withCompetitors()
            ->withRating()
            ->create()
            ->each(function ($freelancingJob) {
                $competitor = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)
                    ->where('user_id', $freelancingJob->accepted_user)->first();

                $adminShare = $competitor->offer * 0.1;
                $reservedShare = $competitor->offer * 0.9;
                // Reserve balance from the publisher
                $wallet = Wallet::where('user_id', $freelancingJob->user_id)->first();
                $wallet->total_balance += $adminShare;
                $wallet->available_balance += $competitor->offer;
                $wallet->reserved_balance -= $reservedShare;
                $wallet->save();

                $admin = Wallet::where('user_id', 1)->first();
                $admin->total_balance -= $adminShare;
                $admin->available_balance -= $adminShare;
                $admin->save();

                $freelancingJob->accepted_user = null;
                $freelancingJob->save();
            });
    }
}
