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
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('driver_id');
            $table->string('name');
            $table->string('surname');
            // $table->string('image')->nullable();
            $table->string('email');
            $table->string('pick_up_address');
            $table->string('drop_down_address');
            $table->string('apartament_number');
            $table->string('id_number');
            $table->string('cnn');
            $table->string('phone_number');
            $table->date('birthday')->nullable();
            $table->enum('status',[1,2,3,4,5])->default(1);
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
