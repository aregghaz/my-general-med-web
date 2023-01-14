<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendor_id');
            $table->string('make');
            $table->string('model');
            $table->string('year');
            $table->string('registration');
            $table->string('inspection');
            $table->string('insurance');
            $table->string('liability');
            $table->timestamps();
        });
    }
   
    // Auto Insurance With expiration date
    // General and Professional Liability Insurance with expiration date
    // Inspection Form
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
}
