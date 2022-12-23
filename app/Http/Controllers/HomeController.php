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
            'type_of_trip', //select
            'miles',
            'member_uniqie_identifer',
            'birthday'
        ];
        $clientData = new ClientFieldCollection($title);
        $showMore = $request->showMore;
        $clientsData = [];
        $selectedFieldsTitle = [];
        $clients = DB::table('clients');
        $clientsDataWith = [];
        for ($i = 0; $i < count($request->titles); $i++) {
            $selectedFieldsTitle[] = $request->titles[$i];
            $explodeRelation = explode("_", $request->titles[$i]);
            if ($explodeRelation[0]  == 'origin') {
                if (!in_array($explodeRelation[0], $clientsDataWith)) {
                    $clientsDataWith[] = $explodeRelation[0];
                    $clientsDataWith[] = $explodeRelation[0];
                    $clients = $clients->join('origin_addresses', 'clients.origin_id', '=', 'origin_addresses.id');
                    $clientsData[] = "origin_addresses." . $explodeRelation[1];
                } elseif (in_array($explodeRelation[0], $clientsDataWith) and $explodeRelation[1] !== 'comment') {
                    $clientsData[] = "origin_addresses." . $explodeRelation[1] . " as origin_" . $explodeRelation[1];
                } elseif ($explodeRelation[1] == 'comment') {
                    $clientsData[] =  'clients.' . $request->titles[$i];
                }
            } else if ($explodeRelation[0] == 'destination') {
                if (!in_array($explodeRelation[0], $clientsDataWith)) {
                    $clientsDataWith[] = $explodeRelation[0];
                    $clientsDataWith[] = $explodeRelation[0];
                    $clients = $clients->join('destination_addresses', 'clients.origin_id', '=', 'destination_addresses.id');
                    $clientsData[] = "destination_addresses." . $explodeRelation[1];
                } elseif (in_array($explodeRelation[0], $clientsDataWith) and $explodeRelation[1] !== 'comments') {
                    $clientsData[] = "destination_addresses." . $explodeRelation[1] . " as destination_" . $explodeRelation[1];;
                } elseif ($explodeRelation[1] == 'comments') {
                    $clientsData[] =  'clients.' . $request->titles[$i];
                }
            } else if ($request->titles[$i] == 'typeOfTrip') {
            } else {
                $clientsData[] =  'clients.' . $request->titles[$i];
            }
        }
        $result = array_diff($title, $selectedFieldsTitle);

        $selectedFields = count($clientsData) > 0 ? $clientsData : $clientData;
        //dd($request->titles);
        $clients = $clients->select($selectedFields);
        $clients =  $clients->take(15 * $showMore)->get();
        unset($selectedFieldsTitle[0]);
        unset($result[0]);
        return response()->json([
            'clients' => $clients,
            'selectedFields' =>  new ClientFieldCollection($selectedFieldsTitle),
            "titles" => new ClientFieldCollection($result)
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
            'destination_comments',
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
