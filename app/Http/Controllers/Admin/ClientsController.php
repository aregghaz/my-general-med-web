<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientFieldCollection;
use App\Http\Resources\StatusCollection;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\ClientTable;
use App\Models\Gender;
use App\Models\Los;
use App\Models\RequestType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{

    protected $title = [
        "id",
        'car_id',
        'vendor_id',
        'type_id',
        'trip_id',
        'operator_id',
        'fullName',
        'gender',///seect
        'los_id',
        'date_of_service',
        'pick_up',
        'drop_down',
        'request_type', ///seect
        'status',///seect
        'origin',
        'origin_phone',
        'origin_id',
        'origin_comment',
        'origin_phone',
        "destination_id",
        "destination",
        "destination_phone",
        'destination_comments',
        'miles',
        'member_uniqie_identifer',
        'birthday',
        'weight',
        'height',
    ];

    public function clientsData(Request $request)
    {
        $allFields = $request->user()->id !== 1 ? $request->user()->fields()->get()->pluck('name')->toArray() : ClientTable::pluck('slug')->toArray();
        $vendorFields = $request->titles ? $request->titles : $allFields;

        $clientData = new ClientFieldCollection($vendorFields);
        $showMore = $request->showMore;
        $clientsData = [];
        $selectedFieldsTitle = [];
        $typeId = (int)$request->typeId;
        $queryData = $request->queryData;
        $tripCount = Clients::where(['type_id' => 1]);
        $available = Clients::where('type_id', 2);
        $cancelCount = Clients::where('type_id', 2)->where('vendor_id', '!=', null);
        $progressCount = Clients::where('type_id', 5);
        $doneCount = Clients::where('type_id', 6);


        if ($typeId === 2 || $typeId === 3 || $typeId === 4) {
            if (($key = array_search('car_id', $vendorFields)) !== false) {
                array_splice($vendorFields, $key, 1);

            }
            if (($key = array_search('vendor_id', $vendorFields)) !== false) {
                array_splice($vendorFields, $key, 1);

            }
            if ($typeId == 4) {
                $clients = DB::table('clients')->where('type_id', 2)->where('clients.vendor_id', '!=', null);

            } else if ($typeId == 2) {
                $clients = DB::table('clients')->where('type_id', 2);
            }
        } else {
            $clients = DB::table('clients')->where('type_id', $request->typeId);
        }
        ///  $clients = DB::table('clients')->where('type_id', $request->typeId);
        if (isset($queryData)) {
            $this->convertQuery($queryData, $vendorFields, $clients);

            $tripCount = $tripCount->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
            $available = $available->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
            $cancelCount = $cancelCount->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
            $progressCount = $progressCount->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
            $doneCount = $doneCount->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
        }

        $doneCount = $doneCount->count();
        $progressCount = $progressCount->count();
        $cancelCount = $cancelCount->count();
        $tripCount = $tripCount->count();
        $available = $available->count();

        for ($i = 0; $i < count($vendorFields); $i++) {
            $selectedFieldsTitle[] = $vendorFields[$i];
            if ($vendorFields[$i] == 'request_type') {
                $clients = $clients->join('request_types', 'clients.request_type', '=', 'request_types.id');
                $clientsData[] = "request_types.name as request_type";
            } else if ($vendorFields[$i] == 'status') {
                $clients = $clients->join('client_statuses', 'clients.type_id', '=', 'client_statuses.id');
                $clientsData[] = "client_statuses.name as status";
            } else if ($vendorFields[$i] == 'los_id') {
                $clients = $clients->join('los', 'clients.los_id', '=', 'los.id');
                $clientsData[] = "los.name as los_id";
                //////gender reletion cheking and add to title
            } else if ($vendorFields[$i] == 'gender') {
                $clients = $clients->join('genders', 'clients.gender', '=', 'genders.id');
                $clientsData[] = "genders.name as gender";
            } else if ($vendorFields[$i] == 'car_id') {
                $clients = $clients->leftJoin('cars', function ($query) {
                    $query->on('cars.id', '=', 'clients.car_id')->whereNotNull('clients.car_id');;
                });
                $clients = $clients->leftJoin('makes', 'makes.id', '=', 'cars.make_id');
                $clientsData[] = "clients.car_id as " . $selectedFieldsTitle[$i];
                $clientsData[] = "makes.name as car_name";
            } else if ($vendorFields[$i] == 'vendor_id') {
                $clients = $clients->join('users as u2', 'clients.vendor_id', '=', 'u2.id');
                $clientsData[] = "u2.name as " . $selectedFieldsTitle[$i];
            } else if ($vendorFields[$i] == 'operator_id') {
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
        ///  $clientStatus = ClientStatus::get();
        $gender = Gender::get();
        $los = Los::get();

        return response()->json([
            'clientType' => $this->clientCreateType(),
            'daysOnWeek' => $this->daysOnWeek(),
            "gender" => new StatusCollection($gender),
            'request_type' => new StatusCollection($request_type),
            "los" => new StatusCollection($los),
            'trip_id' => $this->tripType(),
            ///'status' => new StatusCollection($clientStatus),

        ], 200);
    }

    public function getMondaysInRange($dateFromString, $dateToString, $day)
    {
        $dateFrom = new \DateTime($dateFromString);
        $dateTo = new \DateTime($dateToString);
        $dates = [];

        if ($dateFrom > $dateTo) {
            return $dates;
        }

        if (1 != $dateFrom->format('N')) {
            $dateFrom->modify("next $day");
        }

        while ($dateFrom <= $dateTo) {
            $dates[] = $dateFrom->format('Y-m-d');
            $dateFrom->modify('+1 week');
        }

        return $dates;
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

        $userId = $request->user()->id;
        if ((int)$requestData->clientType->id === 2) {
            foreach ($requestData->daysOnWeek as $days) {
                $dataData = $this->getMondaysInRange($requestData->range[0], $requestData->range[1], $days->label);
                foreach ($dataData as $date) {
                    $this->createClient($requestData, $userId, $date);
                }
            }
        } else {
            $this->createClient($requestData, $userId, $requestData->date_of_service);
        }
//        dd($dataData);
//        $userId = $request->user()->id;
//        $client = new Clients();
//        $client->type_id = 2;
//        $client->trip_id = $requestData->trip_id;
//        $client->fullName = $requestData->fullName;
//        $client->gender = $requestData->gender->id;
//        $client->los_id = $requestData->los->id;
//        $client->date_of_service = $requestData->date_of_service;
//        $client->pick_up = $requestData->pick_up;
//        $client->drop_down = $requestData->drop_down;
//        $client->request_type = $requestData->request_type->id;
//        /// $client->status = $requestData->status->id;
//        $client->operator_id = $userId;
//        if (isset($requestData->origin->address)) {
//            $client->origin = $requestData->origin->address;
//            $client->origin_id = $requestData->origin->id;
//        } else {
//            $client->origin = $requestData->origin;
//        }
//        $client->origin_phone = $requestData->origin_phone;
//        $client->origin_comment = $requestData->origin_comment;
//        if (isset($requestData->destination->address)) {
//            $client->destination = $requestData->destination->address;
//            $client->destination_id = $requestData->destination->id;
//        } else {
//            $client->destination = $requestData->destination;
//        }
//        $client->destination_phone = $requestData->destination_phone;
//        $client->destination_comments = $requestData->destination_comments;
//        $client->member_uniqie_identifer = $requestData->member_uniqie_identifer;
//        $client->birthday = $requestData->birthday;
//        $client->miles = (int)$requestData->miles;

//        if (!$client->save()) {
//            return response()->json(
//                [
//                    'success' => '0',
//                    'type' => 'forbidden',
//                ],
//                200
//            );
//        }


        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        );

    }


    protected function createClient($requestData, $userId, $date)
    {
        $client = new Clients();
        $client->type_id = 2;
        $client->fullName = $requestData->fullName;
        $client->gender = $requestData->gender->id;
        $client->los_id = $requestData->los->id;
        $client->date_of_service = $date;
        $client->price = (float)$requestData->price;
        $client->pick_up = $requestData->pick_up;
        $client->drop_down = $requestData->drop_down;
        $client->request_type = $requestData->request_type->id;
        /// $client->status = $requestData->status->id;
        $client->operator_id = $userId;
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
        $client->height = (float)$requestData->height;
        $client->weight = (float)$requestData->weight;
        if (!$client->save()) {
            return false;
        }
        $client->update([
            "trip_id" => "CC-$client->id-$requestData->trip_id",
        ]);

        $this->createAction($userId, $client->id, 7, 1);
        return true;
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
        $los = Los::get();
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
            'los' => new StatusCollection($los),
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
        $userId = $request->user()->id;
        $requestData = json_decode($request->value);
        $client = Clients::find($id);
        $client->fullName = $requestData->fullName;
        $client->price = (float)$requestData->price;
        $client->gender = $requestData->gender->id;
        $client->los_id = $requestData->los->id;
        $client->date_of_service = $requestData->date_of_service;
        $client->pick_up = $requestData->pick_up;
        $client->drop_down = $requestData->drop_down;
        $client->request_type = $requestData->request_type->id;
        ////  $client->status = $requestData->status->id;
        $client->operator_id = $userId;
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
        $client->height = (float)$requestData->height;
        $client->weight = (float)$requestData->weight;
        $client->update();
        $this->createAction($userId, $id, 9, 1);
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
