<?php

namespace Database\Seeders;

use App\Models\Artificial;
use App\Models\ClientStatus;
use App\Models\Service;
use App\Models\Stairchair;
use App\Models\WaitDuration;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ClientStatus::truncate();
        $status = ['Scheduled', 'Available Trip', 'On hold', 'Rerouted trip', 'In progress', 'Done trip'];
        foreach ($status as $item) {
            DB::table('client_statuses')->insert([
                'name' => $item,
                'slug' => $item,
            ]);
        }
        Stairchair::truncate();
        Artificial::truncate();
        WaitDuration::truncate();
        $status = ['No', 'Yes'];
        foreach ($status as $item) {
            DB::table('stairchairs')->insert([
                'name' => $item,
                'slug' => $item,
            ]);

            DB::table('artificials')->insert([
                'name' => $item,
                'slug' => $item,
            ]);
        }
        DB::table('wait_durations')->insert([
            'name' => 'No',
            'slug' => 'No',
        ]);
        Service::truncate();
        $status = ['Base', 'Per Mile', 'Oxygen' , 'Waiting time' , 'Stair Chair'];
        foreach ($status as $item) {
            DB::table('services')->insert([
                'name' => $item,
                'slug' => $item,
            ]);
        }
    }

}
