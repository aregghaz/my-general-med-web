<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientFieldCollection;
use App\Http\Resources\StatusCollection;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\ClientTable;
use App\Models\Gender;
use App\Models\RequestType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{

    protected $title = [
        'id',
        'trip_id',
        'fullName',
        'gender',
        'los',
        'date_of_service',
        'pick_up',
        'drop_down',
        'request_type', ///seect
        'status', ///seect
        'origin',
        /// 'origin_id',
        'origin_phone',
        'origin_comment',
        'destination',
        //  'destination_id',
        'destination_phone',
        'destination_comments',
        'miles',
        'member_uniqie_identifer',
        'birthday',
        'weight',

    ];

    public function clientsData(Request $request)
    {
        $allFields = $request->user()->id !== 1 ? $request->user()->fields()->get()->pluck('name')->toArray() : ClientTable::pluck('slug')->toArray();
        $vendorFields = $request->titles ? $request->titles : $allFields;

        $clientData = new ClientFieldCollection($vendorFields);
        $showMore = $request->showMore;
        $clientsData = [];
        $selectedFieldsTitle = [];

        $tripCount = Clients::where(['type_id' => 1])->count();
        $available = Clients::where('type_id', 2)->count();
        $cancelCount = Clients::where('type_id', 4)->count();
        $progressCount = Clients::where('type_id', 5)->count();
        $doneCount = Clients::where('type_id', 6)->count();

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
            if ($vendorFields[$i] == 'request_type') {
                $clients = $clients->join('request_types', 'clients.request_type', '=', 'request_types.id');
                $clientsData[] = "request_types.name as request_type";
            } else if ($vendorFields[$i] == 'status') {
                $clients = $clients->join('client_statuses', 'clients.status', '=', 'client_statuses.id');
                $clientsData[] = "client_statuses.name as status";
            } else if ($vendorFields[$i] == 'gender') {
                $clients = $clients->join('genders', 'clients.gender', '=', 'genders.id');
                $clientsData[] = "genders.name as gender";
            } else if ($vendorFields[$i] == 'car_id' and ((int)$request->typeId !== 2 and (int)$request->typeId !== 4)) {
                $clients = $clients->join('cars', function ($query) {
                    $query->on('cars.id', '=', 'clients.car_id')->orWhereNull('clients.car_id');;
                });
                $clients = $clients->join('makes', 'makes.id', '=', 'cars.make_id');
                $clientsData[] = "clients.car_id as " . $selectedFieldsTitle[$i];
                $clientsData[] = "makes.name as car_name";
            } else if ($vendorFields[$i] == 'vendor_id' and ((int)$request->typeId !== 2 and (int)$request->typeId !== 4)) {
                $clients = $clients->join('users as u2', 'clients.vendor_id', '=', 'u2.id');
                $clientsData[] = "u2.name as " . $selectedFieldsTitle[$i];
            } else if ($vendorFields[$i] == 'operator_id' and ((int)$request->typeId !== 2 and (int)$request->typeId !== 4)) {
                $clients = $clients->join('users AS u1', 'clients.operator_id', '=', 'u1.id');
                $clientsData[] = "u1.name as " . $selectedFieldsTitle[$i];
            } else if ($vendorFields[$i] !== 'action') {
                $clientsData[] = 'clients.' . $selectedFieldsTitle[$i] . " as " . $selectedFieldsTitle[$i];
            }
        }

        $result = array_diff($allFields, $selectedFieldsTitle);
        $selectedFields = count($clientsData) > 0 ? $clientsData : $clientData;
        array_unshift($selectedFields, 'clients.id as id');
        ///dd( $selectedFields);

        $clients = $clients->select($selectedFields);

        $clients = $clients->take(15 * $showMore)->get();
        // // dd($clients);
        // // dd( $clients->get());
        // if(count($selectedFieldsTitle) > 1){
        //  array_shift($selectedFieldsTitle);
        // }
        ////  $selectedFieldsTitle[] = 'action';
        //   dd($selectedFieldsTitle);
        return response()->json([
            'clients' => $clients,
            'selectedFields' => new ClientFieldCollection($selectedFieldsTitle),
            "titles" => new ClientFieldCollection($result),
            'tripCount' => $tripCount,
            'availableCount' => $available,
            'cancelCount' => $cancelCount,
            'progressCount' => $progressCount,
            'doneCount' => $doneCount,

        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        $request_type = RequestType::get();
        $clientStatus = ClientStatus::get();
        $gender = Gender::get();

        return response()->json([
            ///   'escortType'=> new StatusCollection($escort),
            "gender" => new StatusCollection($gender),
            'request_type' => new StatusCollection($request_type),
            ///  "type_of_trip" => new StatusCollection($typeOfTrip),
            'status' => new StatusCollection($clientStatus),

        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $requestData
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $requestData = json_decode($request->value);

        $client = new Clients();
        $client->type_id = 2;
        $client->trip_id = $requestData->trip_id;
        $client->fullName = $requestData->fullName;
        $client->gender = $requestData->gender->id;
        $client->los = $requestData->los;
        $client->date_of_service = $requestData->date_of_service;
        $client->pick_up = $requestData->pick_up;
        $client->drop_down = $requestData->drop_down;
        $client->request_type = $requestData->request_type->id;
        $client->status = $requestData->status->id;
        if (isset($requestData->origin->address)) {
            $client->origin = $requestData->origin->address;
            $client->origin_id = $requestData->origin->id;
        } else {
            $client->origin = $requestData->origin;
        }
        $client->origin_phone = $requestData->origin_phone;
        $client->origin_comment = $requestData->origin_comment;
        if (isset($requestData->destination->address)) {
            $client->destination = $requestData->destination->address;
            $client->destination_id = $requestData->destination->id;
        } else {
            $client->destination = $requestData->destination;
        }
        $client->destination_phone = $requestData->destination_phone;
        $client->destination_comments = $requestData->destination_comments;
        $client->member_uniqie_identifer = $requestData->member_uniqie_identifer;
        $client->birthday = $requestData->birthday;
        $client->miles = (int)$requestData->miles;

        if (!$client->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                200
            );
        }
        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        );

    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Clients $clients
     * @return \Illuminate\Http\JsonResponse>json()
     */
    public function show(Clients $clients, $id)
    {

        $request_type = RequestType::get();
        $clientStatus = ClientStatus::get();
        $gender = Gender::get();
        $client = Clients::with([
            /// 'typeOfTrip',
            /// 'escort',
            'genderType',
            'clientStatus',
            'requestType'
        ])->find($id);


        $clientdata = $this->convertSingleData($client);

        return response()->json([
            'data' => $clientdata,
            ///   'escortType'=> new StatusCollection($escort),
            "gender" => new StatusCollection($gender),
            'request_type' => new StatusCollection($request_type),
            ///  "type_of_trip" => new StatusCollection($typeOfTrip),
            'status' => new StatusCollection($clientStatus),

        ], 200);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Clients $clients
     * @return \Illuminate\Http\Response
     */
    public function edit(Clients $clients)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $requestData
     * @param \App\Models\Clients $clients
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id, Clients $clients)
    {
//       /// dd((array)json_decode($requestData->value));
//        $validator = Validator::make((array)json_decode($requestData->value), [
//            'trip_id' => 'required|string',
//            'fullName' => 'required|string',
//            'los' => 'required|string',
//            'date_of_service' => 'required|string',
//            'pick_up' => 'string',
//            'drop_down' => 'string',
//            'origin' => 'string',
//            'origin_phone' => 'string|nullable',
//            'origin_comment' => 'string|nullable',
//            'destination_phone' => 'string|nullable',
//            'destination' => 'string',
//            'destination_comments' => 'string|nullable',
//            'miles' => 'numeric',
//            'member_uniqie_identifer' => 'string',
//            'birthday' => 'string',
//        ]);
//        if ($validator->fails()) {
//            return response()->json(
//                [
//                    'success' => 0,
//                    'type' => 'validation_filed',
//                    'error' => $validator->messages(),
//                ],
//                422
//            );
//        }

        $requestData = json_decode($request->value);

        $client = Clients::find($id);
        $client->trip_id = $requestData->trip_id;
        $client->fullName = $requestData->fullName;
        $client->gender = $requestData->gender->id;
        $client->los = $requestData->los;
        $client->date_of_service = $requestData->date_of_service;
        $client->pick_up = $requestData->pick_up;
        $client->drop_down = $requestData->drop_down;
        $client->request_type = $requestData->request_type->id;
        $client->status = $requestData->status->id;
        if (isset($requestData->origin->address)) {
            $client->origin = $requestData->origin->address;
            $client->origin_id = $requestData->origin->id;
        } else {
            $client->origin = $requestData->origin;
        }
        $client->origin_phone = $requestData->origin_phone;
        $client->origin_comment = $requestData->origin_comment;
        if (isset($requestData->destination->address)) {
            $client->destination = $requestData->destination->address;
            $client->destination_id = $requestData->destination->id;
        } else {
            $client->destination = $requestData->destination;
        }
        $client->destination_phone = $requestData->destination_phone;
        $client->destination_comments = $requestData->destination_comments;
        $client->member_uniqie_identifer = $requestData->member_uniqie_identifer;
        $client->birthday = $requestData->birthday;
        $client->miles = (int)$requestData->miles;

        $client->update();


        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        );

    }

}
