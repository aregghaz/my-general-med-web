<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        DB::table('users')->insert([
            'name' => 'admin',
            'surname' => 'admin',
            'email' => 'admin@admin.com',
            "address" => 'test address',
            'phone_number' => '+37494806080',
            'password' => bcrypt('admin'),
            'role_id'=> 1,
            'vendor_id' => 1,
        ]);
        DB::table('users')->insert([
            'name' => 'vendor',
            'surname' => 'vendor',
            'email' => 'vendor@admin.com',
            "address" => 'test address',
            'phone_number' => '+37494806080',
            'password' => bcrypt('admin'),
            'role_id'=> 2,
            'vendor_id' => 2,
        ]);
        DB::table('users')->insert([
            'name' => 'vendor1',
            'surname' => 'vendor1',
            'phone_number' => '+37494806080',
            'email' => 'vendor1@admin.com',
            "address" => 'test vendor1 address',
            'password' => bcrypt('admin'),
            'role_id'=> 2,
            'vendor_id' => 3,
        ]);
        DB::table('users')->insert([
            'name' => 'operator',
            'surname' => 'operator',
            'phone_number' => '+37494806080',
            'email' => 'operator@admin.com',
            "address" => 'test operator address',
            'password' => bcrypt('admin'),
            'role_id'=> 3,
            'vendor_id' =>2,
        ]);
        DB::table('users')->insert([
            'name' => 'operator1',
            'surname' => 'operator1',
            'phone_number' => '+37494806080',
            'email' => 'operator1@admin.com',
            "address" => 'test operator1 address',
            'password' => bcrypt('admin'),
            'role_id'=> 3,
            'vendor_id' =>2,
        ]);
    }
}
