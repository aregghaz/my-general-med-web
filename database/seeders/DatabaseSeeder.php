<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
//            UserSeeder::class,
            RoleSeeder::class,
           /// StatusSeeder::class,
         PagesSeeder::class,
//            // ClientSeeder::class,
//            // VendorSeeder::class,
            ///TablesFieldsSeeder::class,
            ///        ActionsSeeder::class,
//            MakeSeeder::class,
//            YearSeeder::class,
//            MakeModelSeeder::class

        ]);
    }
}
