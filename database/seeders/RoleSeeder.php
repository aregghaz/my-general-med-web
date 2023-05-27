<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Role;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::truncate();
        $roles= ['admin', 'vendor', 'driver', 'dispatcher' , 'operators'];
            foreach($roles as $role){
                DB::table('roles')->insert([
                'name' =>$role,
            ]);
        }

    }
}
