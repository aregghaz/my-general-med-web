<?php

namespace Database\Seeders;

use App\Models\ClientStatus;
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
        $status= ['Scheduled','Available Trip', 'On hold', 'Rerouted trip', 'In progress', 'Done trip'];
                foreach($status as $item){
                 DB::table('client_statuses')->insert([
                'name' =>$item,
                'slug' =>$item,
                ]);
         }
    }

}
