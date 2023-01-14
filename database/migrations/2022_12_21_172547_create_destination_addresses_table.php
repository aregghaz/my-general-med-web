<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDestinationAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('destination_addresses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('street');
            $table->string('suite')->nulable();;
            $table->string('city');
            $table->string('state');
            $table->string('postal');
            $table->string('country');
            $table->string('phone');
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
        Schema::dropIfExists('destination_addresses');
    }
}
