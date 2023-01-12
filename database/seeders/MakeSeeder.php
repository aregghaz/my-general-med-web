<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MakeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Make::truncate();
        $roles= ['bmw', 'mercedes', 'reno', 'isuzu', 'iveco'];
            foreach($roles as $role){
                DB::table('makes')->insert([
                'name' =>$role,
                'slug' =>$role,
            ]);
        }
    }
}
