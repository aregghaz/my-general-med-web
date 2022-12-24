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
            $table->unsignedBigInteger('client_id')->nullable();
            $table->unsignedBigInteger('car_id')->nullable();
            $table->unsignedBigInteger('vendor_id')->nullable();
            $table->string('trip_id');
            $table->string('name');
            $table->string('surname');
            $table->unsignedBigInteger('gender');
            $table->string('los');
            $table->string('phone_number');
            $table->string('date_of_service');
            $table->string('appointment_time');
            $table->string('pick_up');
            $table->string('drop_down');
            $table->unsignedBigInteger('request_type');
            $table->unsignedBigInteger('status');
            $table->unsignedBigInteger('escortType');
            $table->unsignedBigInteger('type_of_trip');
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
