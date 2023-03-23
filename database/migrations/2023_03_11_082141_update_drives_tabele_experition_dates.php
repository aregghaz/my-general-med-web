<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDrivesTabeleExperitionDates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('drivers', function (Blueprint $table) {
            $table->date('license_exp')->format('m/d/Y')->nullable();
            $table->date('sex_offender_check_exp')->format('m/d/Y')->nullable();
            $table->date('motor_vehicle_record_exp')->format('m/d/Y')->nullable();
            $table->date('defensive_driving_exp')->format('m/d/Y')->nullable();
            $table->date('wheelchair_securement_exp')->format('m/d/Y')->nullable();
            $table->date('pass_basic_exp')->format('m/d/Y')->nullable();
            $table->date('emt_1_exp')->format('m/d/Y')->nullable();
            $table->date('first_aid_exp')->format('m/d/Y')->nullable();
            $table->date('company_training_exp')->format('m/d/Y')->nullable();
            $table->date('drug_test_exp')->format('m/d/Y')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
