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
            $table->text('duration_id')->nullable();
            $table->time('start_time')->format('H:i')->nullable();;// Renaming "emp_name" to "employee_name"
            $table->time('end_time')->format('H:i')->nullable(); // Change Datatype length
            $table->tinyInteger('gender');
            $table->string('los_id')->nullable();
            $table->tinyInteger('request_type');
            $table->float('miles', 5, 2)->nullable();
            $table->string('member_uniqie_identifer')->nullable();
            $table->string('birthday')->nullable();
            $table->text('additionalNote')->nullable();
            $table->float('weight', 5, 2)->nullable();
            $table->string('height')->nullable();

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
