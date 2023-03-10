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
            $table->string('trip_id')->nullable();
            $table->tinyInteger('type_id');
            $table->string('fullName');
            $table->tinyInteger('gender');
            $table->string('los_id')->nullable();
           // $table->string('date_of_service');
            $table->string('pick_up')->nullable();
            $table->string('drop_down')->nullable();
            $table->tinyInteger('request_type');
           /// $table->tinyInteger('status');
            $table->string('origin');
            $table->string('origin_phone')->nullable();
            $table->string('origin_id')->nullable();
            $table->string('destination_id')->nullable();
            $table->string('destination');
            $table->string('destination_phone')->nullable();
            $table->text('origin_comment')->nullable();
            $table->text('destination_comments')->nullable();
            $table->float('miles',5,2)->nullable();
            $table->string('member_uniqie_identifer')->nullable();
            $table->string('birthday')->nullable();
            $table->float('weight' , 5, 2)->nullable();
            $table->float('height', 5, 2)->nullable();
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
