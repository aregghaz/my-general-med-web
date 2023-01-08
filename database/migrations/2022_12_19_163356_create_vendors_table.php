<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->string('license');
            $table->string('picture');
            $table->string('sex_offender_check');
            $table->string('motor_vehicle_record')->nullable();
            $table->string('defensive_driving')->nullable();
            $table->string('wheelchair_securement')->nullable();
            $table->string('pass_bassic')->nullable();
            $table->string('emt_1')->nullable();
            $table->string('first_aid');
            $table->string('company_training');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendors');
    }
}
