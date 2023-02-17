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
        $roles= ['create', 'assignVendor', 'edit', 'assignCar', 'delete','status'];
        foreach($roles as $role){
            DB::table('action_statuses')->insert([
                'name' =>$role,
                'slug' =>$role,
            ]);
        }
    }
}
