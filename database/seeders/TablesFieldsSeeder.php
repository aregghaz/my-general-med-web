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
            'car_id',
            'vendor_id',
            'price',
            'fullName',
            'gender',
            'los_id',
            'artificial_id',
            'duration_id',
           /// 'phone_number',
            'date_of_service',
            'pick_up',
            'start_time',
            'drop_down',
            'end_time',
            'request_type', ///seect
            ////'status', ///seect
            'origin',
          ///  'origin_id',
            'origin_phone',
            'origin_comment',
            'destination',
            'stops',
            ///'destination_id',
            'destination_phone',
            'destination_comments',
            'miles',
            'member_uniqie_identifer',
            'birthday',
            'weight',
            'height',
            'operator_id',
            'additionalNote',
            'operator_note',
        ];

        foreach ($fields as $field) {
            DB::table('client_tables')->insert([
                'name' => $field,
                'slug' => $field,
            ]);
        }
    }
}
