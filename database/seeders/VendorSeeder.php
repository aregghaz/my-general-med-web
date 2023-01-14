<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0  ;$i < 5 ; $i++){
        DB::table('vendors')->insert([
            'name' => 'admin',
            "address" => 'test address',
            'email'=> 'vendor@vendro.com',
            'status' => 1,
        ]);
    }
    }
}
