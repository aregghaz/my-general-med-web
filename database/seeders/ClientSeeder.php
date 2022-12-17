<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    
            for($i = 0  ;$i < 200 ; $i++){
                DB::table('clients')->insert([
                    'name' => 'clientName'.$i,
                    'surname' => 'clientSurname'.$i,
                    'email' => 'admin'.$i.'@admin.com',
                    'phone_number' => '+37494806080',
                    'pick_up_address'=> 'test address',
                    'drop_down_address'=> 'test address',
                    'apartament_number'=> 'test address',
                    'id_number'=> '12321123213',
                    'birthday'=> date("Y-m-d H:i:s"),
                    'status'=> 1
                ]);

            }
       
    }
}
