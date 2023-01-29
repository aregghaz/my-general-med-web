<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientFieldCollection;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{

    protected $title = [
        'id',
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
        'type_of_trip', //select
        'miles',
        'member_uniqie_identifer',
        'birthday',
        'weight',
        'height',
    ];

    public function clientsData(Request $request)
    {
        $allFields  =  $this->title;
        $vendorFields = $request->titles ?$request->titles :  $allFields;

        $clientData = new ClientFieldCollection($vendorFields);
        $showMore = $request->showMore;
        $clientsData = [];
        $selectedFieldsTitle = [];

        $tripCount = Clients::where(['type_id' => 1])->count();
        $available = Clients::where('type_id', 2)->count();

        $clients = DB::table('clients')->where('type_id', $request->typeId);
        if ($request->typeId != 2) {
            $clients = $clients->where('type_id', $request->typeId);
        }
        if (isset($request->queryData)) {
            $this->convertQuery($request->queryData, $vendorFields, $clients);
        }

        $clientsDataWith = [];
        for ($i = 0; $i < count($vendorFields); $i++) {
            $selectedFieldsTitle[] = $vendorFields[$i];
            $explodeRelation = explode("_", $vendorFields[$i]);
            //////origin_address reletion cheking and add to title
            if ($explodeRelation[0]  === 'origin') {
                if (!in_array($explodeRelation[0], $clientsDataWith) and $explodeRelation[1] !== 'comment') {
                    $clientsDataWith[] = $explodeRelation[0];
                    $clients = $clients->join('origin_addresses', 'clients.origin_id', '=', 'origin_addresses.id');
                    $clientsData[] = "origin_addresses." . $explodeRelation[1] . " as origin_" . $explodeRelation[1];
                } elseif (in_array($explodeRelation[0], $clientsDataWith) and $explodeRelation[1] !== 'comment') {
                    $clientsData[] = "origin_addresses." . $explodeRelation[1] . " as origin_" . $explodeRelation[1];
                } elseif ($explodeRelation[1] == 'comment') {
                    $clientsData[] =  'clients.' . $vendorFields[$i];
                }
                //////destination reletion cheking and add to title
            } else if ($explodeRelation[0] === 'destination') {
                if (!in_array($explodeRelation[0], $clientsDataWith)) {
                    $clientsDataWith[] = $explodeRelation[0];
                    $clients = $clients->join('destination_addresses', 'clients.origin_id', '=', 'destination_addresses.id');
                    $clientsData[] = "destination_addresses." . $explodeRelation[1] . " as destination_" . $explodeRelation[1];;
                } elseif (in_array($explodeRelation[0], $clientsDataWith) and $explodeRelation[1] !== 'comments') {
                    $clientsData[] = "destination_addresses." . $explodeRelation[1] . " as destination_" . $explodeRelation[1];;
                } elseif ($explodeRelation[1] == 'comments') {
                    $clientsData[] =  'clients.' . $selectedFieldsTitle[$i];
                }
                //////type_of_trip reletion cheking and add to title
            }
            else if ($vendorFields[$i] == 'type_of_trip') {
                $clients = $clients->join('type_of_trips', 'clients.type_of_trip', '=', 'type_of_trips.id');
                $clientsData[] = "type_of_trips.name as type_of_trip";
                //////request_type reletion cheking and add to title
            }
            else if ($vendorFields[$i] == 'request_type') {
                $clients = $clients->join('request_types', 'clients.request_type', '=', 'request_types.id');
                $clientsData[] = "request_types.name as request_type";
                //////status reletion cheking and add to title
            }
            else if ($vendorFields[$i] == 'status') {
                $clients = $clients->join('client_statuses', 'clients.status', '=', 'client_statuses.id');
                $clientsData[] = "client_statuses.name as status";
                //////gender reletion cheking and add to title
            }
            else if ($vendorFields[$i] == 'gender') {
                $clients = $clients->join('genders', 'clients.gender', '=', 'genders.id');
                $clientsData[] = "genders.name as gender";
                //////adding default fields in to select
            }  else {
                $clientsData[] =  'clients.' . $selectedFieldsTitle[$i] . " as " . $selectedFieldsTitle[$i];
            }
        }

        $result = array_diff( $allFields, $selectedFieldsTitle);
        $selectedFields = count($clientsData) > 0 ? $clientsData : $clientData;
        array_unshift($selectedFields, 'clients.id as id');
        ///dd( $selectedFields);

        $clients = $clients->select($selectedFields);

        $clients =  $clients->take(15 * $showMore)->get();
        // // dd($clients);
        // // dd( $clients->get());
        // if(count($selectedFieldsTitle) > 1){
        //  array_shift($selectedFieldsTitle);
        // }
        $selectedFieldsTitle[] = 'action';
        //   dd($selectedFieldsTitle);
        return response()->json([
            'clients' => $clients,
            'selectedFields' =>  new ClientFieldCollection($selectedFieldsTitle),
            "titles" => new ClientFieldCollection($result),
            'tripCount' => $tripCount,
            'availableCount' => $available,

        ], 200);
    }

}
