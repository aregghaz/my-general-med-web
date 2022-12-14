<?php

namespace Database\Seeders;

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
        $status= ['active','disabled', 'blocked'];
                foreach($status as $item){
                 DB::table('roles')->insert([
                'name' =>$item,
                ]);
         }
    }

}
