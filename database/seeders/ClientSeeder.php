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
    
            for($i = 0  ;$i < 10000 ; $i++){
                DB::table('clients')->insert([
                    'name' => 'clientName'.$i,
                    'surname' => 'clientSurname'.$i,
                    'email' => 'admin'.$i.'@admin.com',
                    'phone_number' => '+37494806080',
                    'pick_up_address'=> 'pick up address address',
                    'drop_down_address'=> 'drop down for user address',
                    'apartament_number'=> 'test address',
                    'id_number'=> '12321123213',
                    'birthday'=> date("Y-m-d H:i:s"),
                    'status'=> 1,
                    "pick_up" => date("Y-m-d H:i:s"),
                    "drop_down"=> date("Y-m-d H:i:s"),
                    'cnn'=> rand(pow(10, 3), pow(10, 4)-1),
                    'vendor_id' => rand(1, 5),
                    "client_id" => rand(pow(10, 3), pow(10, 4)-1),
                    'driver_id' => rand(pow(10, 3), pow(10, 4)-1) 
                ]);

            }
       
    }
}
