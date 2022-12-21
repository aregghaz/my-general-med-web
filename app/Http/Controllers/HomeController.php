<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
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
        return response()->json([
           'users' => new ClientCollection($clients),
        //    "count"=> (Clients::count() / 20)
        ], 200);
    }

  
}
