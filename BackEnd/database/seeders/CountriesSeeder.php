<?php

namespace Database\Seeders;

use App\Models\State;
use App\Models\Country;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fileContent = file_get_contents(storage_path("countries.json"));
        $jsonContent = json_decode($fileContent, true);
        foreach($jsonContent as $country)
        {
            $C = Country::create([
                "country_id" => $country["country_id"],
                "sort_name"=> $country["sortname"],
                "country_name"=> $country["country_name"],
            ]);
            foreach($country["states"] as $state) {
                $S = State::create([
                    "state_id" => $state["state_id"],
                    "state_name"=> $state["state_name"],
                    "country_id"=> $state["country_id"],
                ]);
            }
        }
    }
}
