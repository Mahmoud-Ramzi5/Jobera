<?php

namespace Database\Seeders;

use App\Models\Wallet;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CompaniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::factory()->count(10)->create()->each(function ($company) {
            $balance = mt_rand(10000000, 1000000000) / 100;
            Wallet::create([
                'user_id' => $company->user_id,
                'total_balance' => $balance,
                'available_balance' => $balance,
                'reserved_balance' => 00.0000
            ]);
        });
    }
}
