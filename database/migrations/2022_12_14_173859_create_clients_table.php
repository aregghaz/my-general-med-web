<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('car_id')->nullable();
            $table->unsignedBigInteger('vendor_id')->nullable();
            $table->string('trip_id');
            $table->string('name');
            $table->string('surname');
            $table->tinyInteger('gender');
            $table->string('los');
            $table->string('phone_number');
            $table->string('date_of_service');
            $table->string('appointment_time');
            $table->string('pick_up');
            $table->string('drop_down');
            $table->tinyInteger('type_id');
            $table->tinyInteger('request_type');
            $table->tinyInteger('status');
            $table->tinyInteger('escortType');
            $table->tinyInteger('type_of_trip');
            $table->unsignedBigInteger('origin_id');
            $table->unsignedBigInteger('destination_id');
            $table->text('origin_comment')->nullable();
            $table->text('destination_comments')->nullable();
            $table->unsignedBigInteger('miles')->nullable();
            $table->string('member_uniqie_identifer');
            $table->string('birthday')->nullable();
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
        Schema::dropIfExists('clients');
    }
}
