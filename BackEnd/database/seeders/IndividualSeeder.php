<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\Wallet;
use App\Models\Education;
use App\Models\Individual;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class IndividualSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin
        DB::table('users')->insert(array(
            'id' => 1,
            'email' => 'admin@jobera.com',
            'phone_number' => '+000000000000',
            'password' => Hash::make('admin'),
        ));
        DB::table('wallets')->insert(array(
            'user_id' => 1,
            'total_balance' => 00.0000,
            'available_balance' => 00.0000,
            'reserved_balance' => 00.0000,
        ));

        // Other Individuals
        $skills = Skill::all();
        Individual::factory()->count(25)->create()->each(function ($individual) use ($skills) {
            $individual->skills()->attach(
                $skills->random(rand(1, 5))->pluck('id')->toArray()
            );
            $balance = mt_rand(10000000, 100000000) / 100;
            Wallet::create([
                'user_id' => $individual->user_id,
                'total_balance' => $balance,
                'available_balance' => $balance,
                'reserved_balance' => 00.0000
            ]);
            Education::factory()->create([
                'individual_id' => $individual->id,
            ]);
        });
    }
}
