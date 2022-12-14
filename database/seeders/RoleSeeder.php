<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles= ['user','admin', 'vendor', 'driver', 'operator'];
            foreach($roles as $role){
                DB::table('roles')->insert([
                'name' =>$role,
            ]);
        }
       
    }
}
