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

            for($i = 0  ;$i < 100 ; $i++){
                DB::table('clients')->insert([


                    "client_id",
                    'driver_id',
                    'vendor_id',    
                    'trip_id',
                    'mender',
                    'los',
                    'phone_number',
                    'apartament_id',
                    'data_of_service',
                    'appointment_time',
                    'pick_up',
                    'drop_down',
                    'pick_after_drop_down',
                    'pick_up_address',
                    'request_type', ///seect
                    'status',///seect
                    'origin_id',
                    "destinetion_id",
                    'origin_comment',
                    'destination_comments',
                    'escoct',//select
                    'type_of_trip',//select
                    'miles',
                    'member_uniqie_identifer',
                    'birthday',


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
                 
                    'vendor_id' => rand(1, 5),
                ]);

            }

    }
}
