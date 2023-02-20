<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Http\Resources\StatusCollection;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\Gender;
use App\Models\RequestType;
use Illuminate\Http\Request;
use Validator;

class ClientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $requestData)
    {

        dd('clients');

        if (isset($requestData->querySearch)) {
            $clients = Clients::where('member_uniqie_identifer', 'LIKE', '%' . $requestData->querySearch . '%')->orWhere('car_id', 'LIKE', '%' . $requestData->querySearch . '%')->paginate(20);
        } else {
            $clients = Clients::with([
                'typeOfTrip',
                'escortType',
                'genderType',
                'clientStatus',
                'requestType'
            ])->select(
            // "client_id",
            // 'car_id',
            // 'vendor_id',
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
                'origin_id',
                "destination_id",
                'origin_comment',
                'destination_comments',
                'escortType', //select
                'type_of_trip', //select
                'miles',
                'member_uniqie_identifer',
                'birthday',
                'weight',
                'height'
            )->paginate(20);
        }
        return response()->json(new ClientCollection($clients), 200);
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $requestData)
    {
        //
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
    public function update(Request $requestData, $id, Clients $clients)
    {
        dd('222');
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

        $requestData = json_decode($requestData->value);

        $client = Clients::find($id);
///dd($requestData->gender);
        $client = $client->update([
            'trip_id' => $requestData->trip_id,
            'fullName' => $requestData->fullName,
            'gender' => $requestData->gender->id,
            'los' => $requestData->los,
            'date_of_service' => $requestData->date_of_service,
            ///'appointment_time' => $requestData->appointment_time,
            'pick_up' => $requestData->pick_up,
            'drop_down' => $requestData->drop_down,
            //  'request_type' => $requestTypeId, ///seect
            /// 'status' => $statusId, ///seect
            'origin' => $requestData->origin,
            'origin_phone' => $requestData->origin_phone,
            ///'origin_id' => $originDataId,
            'origin_comment' => $requestData->origin_comment,
            'destination_phone' => $requestData->destination_phone,
            "destination" => $requestData->destination,
            /// "destination_id" => $destinetionDataId,
            'destination_comments' => $requestData->destination_comments,
            'miles' => (int)$requestData->miles,
            'member_uniqie_identifer' => $requestData->member_uniqie_identifer,
            'birthday' => $requestData->birthday,
        ]);

        return response()->json([
            'users' => $client
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Clients $clients
     * @return \Illuminate\Http\Response
     */
    public function destroy(Clients $clients)
    {
        //
    }

    public function updateClient(Request $request,$id){
        Clients::find($id)->update([
            "pick_up" => $request->pick_up,
            "drop_down"=>$request->drop_down,
            "additionalNote"=>$request->additionalNote,
        ]);
        return response()->json([
        ], 200);
    }

}
