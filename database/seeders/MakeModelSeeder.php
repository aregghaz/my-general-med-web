<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MakeModel;
use Illuminate\Support\Facades\DB;
class MakeModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        MakeModel::truncate();
        $roles= ['model1', 'model2', 'model13', 'model4', 'model15','model6','model7','model8','model9','model10','model11','model12','model13','model14','model15','model16','model17'];
            foreach($roles as $role){
                DB::table('make_models')->insert([
                    'make_id' =>  rand(1, 5),
                'name' =>$role,
                'slug' =>$role,
            ]);
        }
    }
}
