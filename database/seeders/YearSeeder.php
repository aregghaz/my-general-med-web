<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Year;
class YearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Year::truncate();
        // $roles= ['19', 'vendor', 'driver', 'operator'];
            for($i = 1980; $i < 2024; $i++){
                DB::table('years')->insert([
                'name' =>$i,
                'slug' =>$i,
            ]);
        }

    }
}
