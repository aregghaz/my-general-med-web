<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname')->nullable();
            $table->unsignedBigInteger('vendor_id')->nullable();
            $table->string('image')->nullable();
            $table->string('email');
            $table->string('password');
            $table->string('phone_number')->nullable();
            // $table->unsignedBigInteger('state_id');
            $table->string('address')->nullable();
            $table->date('birthday')->nullable();
            $table->unsignedBigInteger('role_id');
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
        Schema::dropIfExists('users');
    }
}
