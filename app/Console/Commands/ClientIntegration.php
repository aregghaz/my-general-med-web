<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClientIntegration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'client:integration';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command for  integraion client list';

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
    
        /* open this for local file testing purposes only*/
        $csv_data = file_get_contents(base_path().'/public/uploads/1.csv');

        /// DB::beginTransaction();
      dd( $csv_data);
      
        $rows = str_getcsv($csv_data, "\n");
        $result = array();
        foreach ($rows as $k => $row) {
            if ($k > 0) {
                $result[$k - 1] = str_getcsv($rows[$k], ';');
            }
        }
    }
}
