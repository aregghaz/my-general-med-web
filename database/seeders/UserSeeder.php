<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'surname' => 'admin',
            'email' => 'admin@admin.com',
            "address" => 'test address',
            'phone_number' => '+37494806080',
            'password' => bcrypt('admin'),
            'role'=> 'admin'
        ]);
        DB::table('users')->insert([
            'name' => 'admin',
            'surname' => 'admin',
            'phone_number' => '+37494806080',
            'email' => 'driver@admin.com',
            "address" => 'test address',
            'password' => bcrypt('admin'),
            'role'=> 'driver'
        ]);
        DB::table('users')->insert([
            'name' => 'admin',
            'surname' => 'admin',
            'phone_number' => '+37494806080',
            "address" => 'test address',
            'email' => 'operator@admin.com',
            'password' => bcrypt('admin'),
            'role'=> 'vendor'
        ]);
    }
}
