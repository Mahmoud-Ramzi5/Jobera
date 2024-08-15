<?php

namespace Database\Seeders;

use App\Models\RegJob;
use App\Models\FreelancingJob;
use App\Models\RegJobCompetitor;
use App\Models\FreelancingJobCompetitor;
use App\Models\Wallet;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // MyUser
        DB::table('users')->insert(array(
            'id' => 37,
            'email' => 'mzramzi5@gmail.com',
            'phone_number' => '+963999865443',
            'password' => Hash::make('1234'),
            'state_id' => 3464,
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now()
        ));
        DB::table('wallets')->insert(array(
            'user_id' => 37,
            'total_balance' => 100000.0000,
            'available_balance' => 100000.0000,
            'reserved_balance' => 00.0000,
            'created_at' => now(),
            'updated_at' => now()
        ));
        DB::table('individuals')->insert(array(
            'id' => 26,
            'full_name' => 'Mahmoud Ramzi',
            'birth_date' => '2003-05-07',
            'gender' => 'MALE',
            'type' => 'individual',
            'user_id' => 37,
            'created_at' => now(),
            'updated_at' => now()
        ));
        DB::table('education')->insert(array(
            "level" => 'BACHELOR',
            "field" => 'IT',
            "school" => 'Damascus University',
            "start_date" => '2021-09-15',
            "end_date" => '2026-08-23',
            "individual_id" => 26,
            'created_at' => now(),
            'updated_at' => now()
        ));


        DB::table('users')->insert(array(
            'id' => 38,
            'email' => 'mzramzi0@gmail.com',
            'phone_number' => '+1999865443',
            'password' => Hash::make('1234'),
            'state_id' => 3924,
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now()
        ));
        DB::table('wallets')->insert(array(
            'user_id' => 38,
            'total_balance' => 1000000.0000,
            'available_balance' => 1000000.0000,
            'reserved_balance' => 00.0000,
            'created_at' => now(),
            'updated_at' => now()
        ));
        DB::table('companies')->insert(array(
            'id' => 11,
            'name' => 'Habidano',
            'field' => 'IT',
            'founding_date' => '2000-01-01',
            'user_id' => 38,
            'created_at' => now(),
            'updated_at' => now()
        ));

        RegJob::factory()
            ->count(10)
            ->withCompetitors()
            ->create()
            ->each(function ($regJob) {
                $wallet = Wallet::where('user_id', $regJob->company->user_id)->first();
                $wallet->total_balance += $regJob->salary * 0.10;
                $wallet->available_balance += $regJob->salary * 0.10;
                $wallet->save();

                $transactions = $regJob->defJob->transactions;
                foreach ($transactions as $transaction) {
                    $transaction->delete();
                }

                $regJob->company_id = 11;
                $regJob->accepted_individual = null;
                $regJob->save();

                $wallet = Wallet::where('user_id', $regJob->company->user_id)->first();
                $wallet->total_balance -= $regJob->salary * 0.10;
                $wallet->available_balance -= $regJob->salary * 0.10;
                $wallet->save();

                $transactionParams = [
                    'sender_id' => $wallet->id,
                    'receiver_id' => 1,
                    'defJob_id' => $regJob->defJob_id,
                    'amount' => $regJob->salary * 0.10,
                    'date' => now()
                ];
                Transaction::create($transactionParams);

                $me = RegJobCompetitor::where('job_id', $regJob->id)->where('individual_id', 26)->first();
                if ($me == null) {
                    DB::table('reg_job_competitors')->insert(array(
                        'individual_id' => 26,
                        'job_id' => $regJob->id,
                        'description' => 'I can do this job',
                        'created_at' => now(),
                        'updated_at' => now()
                    ));
                }
            });

        RegJob::factory()
            ->count(10)
            ->withCompetitors()
            ->create()
            ->each(function ($regJob) {
                $wallet = Wallet::where('user_id', $regJob->company->user_id)->first();
                $wallet->total_balance += $regJob->salary * 0.10;
                $wallet->available_balance += $regJob->salary * 0.10;
                $wallet->save();

                $transactions = $regJob->defJob->transactions;
                foreach ($transactions as $transaction) {
                    $transaction->delete();
                }

                $regJob->company_id = 11;
                $regJob->accepted_individual = 26;
                $regJob->save();

                $wallet = Wallet::where('user_id', $regJob->company->user_id)->first();
                $wallet->total_balance -= $regJob->salary * 0.10;
                $wallet->available_balance -= $regJob->salary * 0.10;
                $wallet->save();

                $transactionParams = [
                    'sender_id' => $wallet->id,
                    'receiver_id' => 1,
                    'defJob_id' => $regJob->defJob_id,
                    'amount' => $regJob->salary * 0.10,
                    'date' => now()
                ];
                Transaction::create($transactionParams);

                $me = RegJobCompetitor::where('job_id', $regJob->id)->where('individual_id', 26)->first();
                if ($me == null) {
                    DB::table('reg_job_competitors')->insert(array(
                        'individual_id' => 26,
                        'job_id' => $regJob->id,
                        'description' => 'I can do this job',
                        'created_at' => now(),
                        'updated_at' => now()
                    ));
                }
            });

        RegJob::factory()
            ->count(5)
            ->withCompetitors()
            ->create()
            ->each(function ($regJob) {
                $wallet = Wallet::where('user_id', $regJob->company->user_id)->first();
                $wallet->total_balance += $regJob->salary * 0.10;
                $wallet->available_balance += $regJob->salary * 0.10;
                $wallet->save();

                $regJob->company_id = 11;
                $regJob->accepted_individual = 26;
                $regJob->save();

                $wallet = Wallet::where('user_id', $regJob->company->user_id)->first();
                $wallet->total_balance -= $regJob->salary * 0.10;
                $wallet->available_balance -= $regJob->salary * 0.10;
                $wallet->save();

                $me = RegJobCompetitor::where('job_id', $regJob->id)->where('individual_id', 26)->first();
                if ($me == null) {
                    DB::table('reg_job_competitors')->insert(array(
                        'individual_id' => 26,
                        'job_id' => $regJob->id,
                        'description' => 'I can do this job',
                        'created_at' => now(),
                        'updated_at' => now()
                    ));
                }
                $regJob->defJob->is_done = true;
                $regJob->defJob->save();
            });

        FreelancingJob::factory()
            ->count(10)
            ->withCompetitors()
            ->create()
            ->each(function ($freelancingJob) {
                $competitor = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)
                    ->where('user_id', $freelancingJob->accepted_user)->first();

                $adminShare = $competitor->offer * 0.1;
                $reservedShare = $competitor->offer * 0.9;
                $wallet = Wallet::where('user_id', $freelancingJob->user_id)->first();
                $wallet->total_balance += $adminShare;
                $wallet->available_balance += $competitor->offer;
                $wallet->reserved_balance -= $reservedShare;
                $wallet->save();

                $freelancingJob->user_id = 38;
                $freelancingJob->accepted_user = 37;
                $freelancingJob->save();

                $me = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)->where('user_id', 37)->first();
                if ($me == null) {
                    DB::table('freelancing_job_competitors')->insert(array(
                        'user_id' => 37,
                        'job_id' => $freelancingJob->id,
                        'offer' => $freelancingJob->min_salary + 10,
                        'description' => 'I can do this job',
                        'created_at' => now(),
                        'updated_at' => now()
                    ));
                }

                $competitor = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)
                    ->where('user_id', 37)->first();

                $adminShare = $competitor->offer * 0.1;
                $reservedShare = $competitor->offer * 0.9;
                $wallet = Wallet::where('user_id', 38)->first();
                $wallet->total_balance -= $adminShare;
                $wallet->available_balance -= $reservedShare;
                $wallet->reserved_balance += $reservedShare;
                $wallet->save();
            });

        FreelancingJob::factory()
            ->count(10)
            ->withCompetitors()
            ->create()
            ->each(function ($freelancingJob) {
                $competitor = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)
                    ->where('user_id', $freelancingJob->accepted_user)->first();

                $adminShare = $competitor->offer * 0.1;
                $reservedShare = $competitor->offer * 0.9;
                $wallet = Wallet::where('user_id', $freelancingJob->user_id)->first();
                $wallet->total_balance += $adminShare;
                $wallet->available_balance += $competitor->offer;
                $wallet->reserved_balance -= $reservedShare;
                $wallet->save();

                $freelancingJob->user_id = 38;
                $freelancingJob->accepted_user = null;
                $freelancingJob->save();

                $me = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)->where('user_id', 37)->first();
                if ($me == null) {
                    DB::table('freelancing_job_competitors')->insert(array(
                        'user_id' => 37,
                        'job_id' => $freelancingJob->id,
                        'offer' => $freelancingJob->min_salary + 10,
                        'description' => 'I can do this job',
                        'created_at' => now(),
                        'updated_at' => now()
                    ));
                }
            });

        // By Mahmoud Ramzi
        FreelancingJob::factory()
            ->count(10)
            ->withCompetitors()
            ->create()
            ->each(function ($freelancingJob) {
                $competitor = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)
                    ->where('user_id', $freelancingJob->accepted_user)->first();

                $adminShare = $competitor->offer * 0.1;
                $reservedShare = $competitor->offer * 0.9;
                $wallet = Wallet::where('user_id', $freelancingJob->user_id)->first();
                $wallet->total_balance += $adminShare;
                $wallet->available_balance += $competitor->offer;
                $wallet->reserved_balance -= $reservedShare;
                $wallet->save();

                $freelancingJob->user_id = 37;
                $freelancingJob->accepted_user = 38;
                $freelancingJob->save();

                $me = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)->where('user_id', 38)->first();
                if ($me == null) {
                    DB::table('freelancing_job_competitors')->insert(array(
                        'user_id' => 38,
                        'job_id' => $freelancingJob->id,
                        'offer' => $freelancingJob->min_salary + 10,
                        'description' => 'I can do this job',
                        'created_at' => now(),
                        'updated_at' => now()
                    ));
                }

                $competitor = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)
                    ->where('user_id', 38)->first();

                $adminShare = $competitor->offer * 0.1;
                $reservedShare = $competitor->offer * 0.9;
                $wallet = Wallet::where('user_id', 37)->first();
                $wallet->total_balance -= $adminShare;
                $wallet->available_balance -= $competitor->offer;
                $wallet->reserved_balance += $reservedShare;
                $wallet->save();
            });

        FreelancingJob::factory()
            ->count(10)
            ->withCompetitors()
            ->create()
            ->each(function ($freelancingJob) {
                $competitor = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)
                    ->where('user_id', $freelancingJob->accepted_user)->first();

                $adminShare = $competitor->offer * 0.1;
                $reservedShare = $competitor->offer * 0.9;
                $wallet = Wallet::where('user_id', $freelancingJob->user_id)->first();
                $wallet->total_balance += $adminShare;
                $wallet->available_balance += $competitor->offer;
                $wallet->reserved_balance -= $reservedShare;
                $wallet->save();

                $freelancingJob->user_id = 37;
                $freelancingJob->accepted_user = null;
                $freelancingJob->save();

                $me = FreelancingJobCompetitor::where('job_id', $freelancingJob->id)->where('user_id', 38)->first();
                if ($me == null) {
                    DB::table('freelancing_job_competitors')->insert(array(
                        'user_id' => 38,
                        'job_id' => $freelancingJob->id,
                        'offer' => $freelancingJob->min_salary + 10,
                        'description' => 'I can do this job',
                        'created_at' => now(),
                        'updated_at' => now()
                    ));
                }
            });

        DB::table('chats')->insert(array(
            'user1_id' => 38,
            'user2_id' => 37,
        ));
    }
}
