<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDriversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('car_id')->nullable();
            $table->string('license');
            $table->string('picture');
            $table->string('sex_offender_check');
            $table->string('motor_vehicle_record');
            $table->string('defensive_driving');
            $table->string('wheelchair_securement');
            $table->string('pass_basic');
            $table->string('emt_1');
            $table->string('first_aid');
            $table->string('company_training');
            $table->string('drug_test');
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
        Schema::dropIfExists('drivers');
    }
}
