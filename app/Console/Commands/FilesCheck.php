<?php

namespace App\Console\Commands;

use App\Models\Driver;
use Illuminate\Console\Command;

class FilesCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'checkFile:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $queryData = date('Y-m-d', strtotime("+60 days"));
       $data =  Driver::where(function ($query) use ($queryData)  {
            $query->where('sex_offender_check_exp', "<=",  $queryData)
                ->orWhere('motor_vehicle_record_exp',"<=",  $queryData)
                ->orWhere('license_exp', "<=", $queryData)
                ->orWhere('wheelchair_securement_exp',"<=",  $queryData)
                ->orWhere('pass_basic_exp',"<=",  $queryData)
                ->orWhere('emt_1_exp',"<=",  $queryData)
                ->orWhere('first_aid_exp',"<=",  $queryData)
                ->orWhere('company_training_exp',"<=",  $queryData)
                ->orWhere('drug_test_exp',"<=",  $queryData)
                ->orWhere('defensive_driving_exp',  "<=",$queryData);
        });
       dd($data);
        return 0;
    }
}
