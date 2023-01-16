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
            $table->unsignedBigInteger('make_id');
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('year_id');
            $table->string('registration')->nullable();
            $table->string('inspection')->nullable();
            $table->string('insurance')->nullable();
            $table->string('liability')->nullable();
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
