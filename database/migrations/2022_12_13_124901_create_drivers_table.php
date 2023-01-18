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
            $table->string('license')->nullable();
            $table->string('picture')->nullable();
            $table->string('sex_offender_check')->nullable();
            $table->string('motor_vehicle_record')->nullable();
            $table->string('defensive_driving')->nullable();
            $table->string('wheelchair_securement')->nullable();
            $table->string('pass_basic')->nullable();
            $table->string('emt_1')->nullable();
            $table->string('first_aid')->nullable();
            $table->string('company_training')->nullable();
            $table->string('drug_test')->nullable();
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
