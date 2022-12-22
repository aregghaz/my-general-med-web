<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Http\Resources\ClientFieldCollection;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class HomeController extends Controller
{

public function clientData(Request $request)    {
    $vendorID = 1;
    $showMore = $request->showMore;
//         $data =  $request->all();
//   dd( $data);
$fieldData  =[];
$clientsData = [];
$clients = DB::table('clients');

     for($i = 0; $i <count($request->titles); $i++){
        //$clients= $clients->select($data[$i]['slug']);
        $clientsData[] = $request->titles[$i]['slug'];
     } 
    //  dd($clientsData);
   $clients= $clients->select($clientsData);
    $clients=  $clients->take(15*$showMore)->get();
    // if(Isset($request->querySearch)){
    
        
    //     //$clients = Clients::where('vendor_id', $vendorID)->where( 'client_id', 'LIKE', '%' . $request->querySearch . '%' )->orWhere( 'driver_id', 'LIKE', '%' . $request->querySearch . '%' )->paginate(20);

    // }else{
     
   
    // }
//dd($fieldData);
$title = [
    'trip_id',
    'name',
    'surname',
    'gender',
    'los',
    'phone_number',
    'date_of_service',
    'appointment_time',
    'pick_up',
    'drop_down',
    'request_type', ///seect
    'status',///seect
    'origin_name',
    'origin_street',
    'origin_suite',
    'origin_city',
    'origin_state',
    'origin_postal',
    'origin_country',
    'origin_phone',
    'origin_comment',
    'destination_name',
    'destination_street',
    'destination_suite',
    'destination_city',
    'destination_state',
    'destination_postal',
    'destination_country',
    'destination_phone',
    'destination_comment',
    'escortType',//select
    'typeOfTrip',//select
    'miles',
    'member_uniqie_identifer',
    'birthday'
];


    return response()->json([
       'clients' =>$clients,
       
       "titles" => new ClientFieldCollection($title)
    //    "count"=> (Clients::count() / 20)
    ], 200);
}










    public function index(Request $request)
    {
        $vendorID = Auth::user()->vendor_id;
        $showMore = $request->showmore;
     
     
        if(Isset($request->querySearch)){
        
            
            $clients = Clients::where('vendor_id', $vendorID)->where( 'client_id', 'LIKE', '%' . $request->querySearch . '%' )->orWhere( 'driver_id', 'LIKE', '%' . $request->querySearch . '%' )->paginate(20);

        }else{
            $clients = Clients::with([
                'origin',
                'destination',
                'typeOfTrip',
                'escortType',
                'clientStatus',
                'requestType'
                ])->select(
                "client_id",
                'car_id',
                'vendor_id',    
                'trip_id',
                'name',
                'surname',
                'gender',
                'los',
                'phone_number',
                'date_of_service',
                'appointment_time',
                'pick_up',
                'drop_down',
                
                'request_type', ///seect
                'status',///seect
                'origin_id',
                "destination_id",
                'origin_comment',
                'destination_comments',
                'escortType',//select
                'type_of_trip',//select
                'miles',
                'member_uniqie_identifer',
                'birthday'
                )->take(15)->get();

       
    }

    $title = [
        'trip_id',
        'name',
        'surname',
        'gender',
        'los',
        'phone_number',
        'date_of_service',
        'appointment_time',
        'pick_up',
        'drop_down',
        'request_type', ///seect
        'status',///seect
        'origin_name',
        'origin_street',
        'origin_suite',
        'origin_city',
        'origin_state',
        'origin_postal',
        'origin_country',
        'origin_phone',
        'origin_comment',
        'destination_name',
        'destination_street',
        'destination_suite',
        'destination_city',
        'destination_state',
        'destination_postal',
        'destination_country',
        'destination_phone',
        'destination_comment',
        'escortType',//select
        'typeOfTrip',//select
        'miles',
        'member_uniqie_identifer',
        'birthday'
];

        return response()->json([
           'clients' => new ClientCollection($clients),
           "titles" => new ClientFieldCollection($title)
        //    "count"=> (Clients::count() / 20)
        ], 200);
    }

  
}
