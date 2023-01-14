<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ClientTable;
use Illuminate\Support\Facades\DB;
class TablesFieldsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ClientTable::truncate();
        $fields = [
            'id',
            'trip_id',
            'name',
            'surname',
            'gender',
            'los',
            'phone_number',
            'date_of_service',
            'appointment_time',
            'pick_up',
            'drop_down',
            'request_type', ///seect
            'status', ///seect
            'origin_name',
            'origin_street',
            'origin_suite',
            'origin_city',
            'origin_state',
            'origin_postal',
            'origin_country',
            'origin_phone',
            'origin_comment',
            'destination_name',
            'destination_street',
            'destination_suite',
            'destination_city',
            'destination_state',
            'destination_postal',
            'destination_country',
            'destination_phone',
            'destination_comments',
            'escortType', //select
            'type_of_trip', //select
            'miles',
            'member_uniqie_identifer',
            'birthday',
        ];

        foreach ($fields as $field) {
            DB::table('client_tables')->insert([
                'name' => $field,
                'slug' => $field,
            ]);
        }
    }
}
