<?php

namespace Database\Seeders;

use App\Models\ActionStatus;
use App\Models\Make;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ActionStatus::truncate();
        $roles= ['Create', 'assignVendor', 'edit', 'assignCar', 'delete','status'];
        foreach($roles as $role){
            DB::table('makes')->insert([
                'name' =>$role,
                'slug' =>$role,
            ]);
        }
    }
}
