<?php

namespace Database\Seeders;

use App\Models\Pages;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Pages::truncate();
        $roles= ['/dashboard', '/vendors', '/', '/users', '/cars' , '/users' ,'/notification'];
        foreach($roles as $role){
            DB::table('pages')->insert([
                'name' =>$role,
                'slug' =>$role,
            ]);
        }
    }
}
