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

    public function clientData(Request $request)
    {
        $vendorID = 1;
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
            'status', ///seect
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
            'escortType', //select
            'typeOfTrip', //select
            'miles',
            'member_uniqie_identifer',
            'birthday'
        ];
        $clientData = new ClientFieldCollection($title);
        $showMore = $request->showMore;

        $fieldData  = [];
        $clientsData = [];
        $clients = DB::table('clients');
        $clientsDataWith = [];
        for ($i = 0; $i < count($request->titles); $i++) {
            $exploseReletion = explode("_", $request->titles[$i]['slug']);

            if ($exploseReletion[0]  == 'origin') {
                if (!in_array($exploseReletion[0], $clientsDataWith)) {
                    $clientsDataWith[] = $exploseReletion[0];
                    $clientsDataWith[] = $exploseReletion[0];
                    $clients = $clients->join('origin_addresses', 'clients.origin_id', '=', 'origin_addresses.id');
                    $clientsData[] = "origin_addresses." . $exploseReletion[1];
                } elseif (in_array($exploseReletion[0], $clientsDataWith) and $exploseReletion[1] !== 'comment') {
                    $clientsData[] = "origin_addresses." . $exploseReletion[1]." as origin_".$exploseReletion[1];
                }
            }else if ($exploseReletion[0] == 'destination') {

                if (!in_array($exploseReletion[0], $clientsDataWith)) {
                    $clientsDataWith[] = $exploseReletion[0];
                    $clientsDataWith[] = $exploseReletion[0];
                    $clients = $clients->join('destination_addresses', 'clients.origin_id', '=', 'destination_addresses.id');
                    $clientsData[] = "destination_addresses." . $exploseReletion[1];
                } elseif (in_array($exploseReletion[0], $clientsDataWith) and $exploseReletion[1] !== 'comment') {
                    $clientsData[] = "destination_addresses." . $exploseReletion[1]." as destination_".$exploseReletion[1];;
                }
            } else if ($request->titles[$i]['slug']== 'typeOfTrip') {

           
            }else {
                $clientsData[] =  'clients.'.$request->titles[$i]['slug'];
            }
        }
      ///  dd($clientsData);
        $clients = $clients->select(count($clientsData) > 0 ? $clientsData : $clientData);
        $clients =  $clients->take(15 * $showMore)->get();
        // if(Isset($request->querySearch)){


        //     //$clients = Clients::where('vendor_id', $vendorID)->where( 'client_id', 'LIKE', '%' . $request->querySearch . '%' )->orWhere( 'driver_id', 'LIKE', '%' . $request->querySearch . '%' )->paginate(20);

        // }else{


        // }
        //dd($fieldData);


        return response()->json([
            'clients' => $clients,

            "titles" => new ClientFieldCollection($title)
            //    "count"=> (Clients::count() / 20)
        ], 200);
    }










    public function index(Request $request)
    {
        $vendorID = Auth::user()->vendor_id;
        $showMore = $request->showmore;


        if (isset($request->querySearch)) {


            $clients = Clients::where('vendor_id', $vendorID)->where('client_id', 'LIKE', '%' . $request->querySearch . '%')->orWhere('driver_id', 'LIKE', '%' . $request->querySearch . '%')->paginate(20);
        } else {
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
                'status', ///seect
                'origin_id',
                "destination_id",
                'origin_comment',
                'destination_comments',
                'escortType', //select
                'type_of_trip', //select
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
            'status', ///seect
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
            'escortType', //select
            'typeOfTrip', //select
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
