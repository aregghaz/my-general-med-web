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
        'birthday'
    ];

    public function clientData(Request $request)
    {
        $allFields  =  $request->user()->fields()->get()->pluck('name')->toArray();
        $vendorFields = $request->titles ?$request->titles :  $allFields;

        $clientData = new ClientFieldCollection($vendorFields);
        $showMore = $request->showMore;
        $clientsData = [];
        $selectedFieldsTitle = [];

        $tripCount = Clients::where(['vendor_id' => $request->user()->id, 'type_id' => 1])->count();
        $available = Clients::where('type_id', 2)->count();

        $clients = DB::table('clients')->where('type_id', $request->typeId);
        if ($request->typeId != 2) {
            $clients = $clients->where('vendor_id', $request->user()->id);
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

        //   dd($selectedFieldsTitle);
        return response()->json([
            'clients' => $clients,
            'selectedFields' =>  new ClientFieldCollection($selectedFieldsTitle),
            "titles" => new ClientFieldCollection($result),
            'tripCount' => $tripCount,
            'availableCount' => $available,

        ], 200);
    }


    public function show($id)
    {
        $client = Clients::where('id', $id)->with([
            'origin',
            'destination',
            'typeOfTrip',
            'escortType',
            'clientStatus',
            'requestType'
        ])->limit(1)->get();
        return response()->json([
            'client' => $client
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
                'genderType',
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



        return response()->json([
            'clients' => new ClientCollection($clients),
            "titles" => new ClientFieldCollection($this->title)
            //    "count"=> (Clients::count() / 20)
        ], 200);
    }
    public function changeClientType(Request $request)
    {

        $ids = $request->ids;
        Clients::whereIn('id', $ids)->update(['type_id' =>  $request->status, 'vendor_id' => $request->user()->id]);

        return response()->json([
            'status' => 200
        ], 200);
    }

    protected function convertQuery($queryData, $title, $clients)
    {

        $clients = $clients->where(function ($query) use ($title, $queryData) {
            // $clients =  $this->convertQuery($request->queryData, $vendorFields, $clients);

            for ($i = 0; $i < count($title); $i++) {
                if ($title[$i] !== 'name' && $title[$i] !== 'id') {
                    $explodeRelation = explode("_", $title[$i]);
                    //////origin_address reletion cheking and add to title
///FIIME THIS PART
                    if (($explodeRelation[0] === 'origin' || $explodeRelation[0] === 'destination') and $explodeRelation[1] !== 'comment') {
                        //   $clients = $clients->orWhere($explodeRelation[1], 'LIKE', '%' . $query . '%');
                    } else {

                         $query->orWhere($title[$i], 'LIKE', '%' . $queryData . '%');
                    }
                }
            }
        });
        return $clients;
    }

}
