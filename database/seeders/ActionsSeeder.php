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
        $roles= ['Claimed Trip','Available Trip', 'On hold', 'Rerouted trip', 'In progress', 'Done trip','Created', 'Assigned to Vendor', 'Edited', 'Assigned to Car', 'Deleted','60  day expired','30 day expired','15 < days expired','Not assigned'];

        foreach($roles as $role){
            DB::table('action_statuses')->insert([
                'name' =>$role,
                'slug' =>$role,
            ]);
        }
    }
}
