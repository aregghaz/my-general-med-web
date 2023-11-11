<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCarsTableWithExp extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cars', function(Blueprint $table){
          //  $table->date('registration_exp')->format('m/d/Y')->nullable();
            $table->date('inspection_exp')->format('Y-m-d')->nullable();
            $table->date('insurance_exp')->format('Y-m-d')->nullable();
            $table->date('liability_exp')->format('Y-m-d')->nullable();;

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
