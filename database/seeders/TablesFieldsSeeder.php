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
            'fullName',
            'gender',
            'los',
           /// 'phone_number',
            'date_of_service',
            'pick_up',
            'drop_down',
            'request_type', ///seect
            'status', ///seect
            'origin',
          ///  'origin_id',
            'origin_phone',
            'origin_comment',
            'destination',
            ///'destination_id',
            'destination_phone',
            'destination_comments',
            'miles',
            'member_uniqie_identifer',
            'birthday',
            'weight',
            'height',
        ];

        foreach ($fields as $field) {
            DB::table('client_tables')->insert([
                'name' => $field,
                'slug' => $field,
            ]);
        }
    }
}
