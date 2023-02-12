<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Http\Resources\ClientFieldCollection;
use App\Http\Resources\StatusCollection;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\Escort;
use App\Models\Gender;
use App\Models\RequestType;
use App\Models\TypeOfTrip;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {

dd('clients');

        if (isset($request->querySearch)) {
            $clients = Clients::where('member_uniqie_identifer', 'LIKE', '%' . $request->querySearch . '%')->orWhere('car_id', 'LIKE', '%' . $request->querySearch . '%')->paginate(20);
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
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
        $client =  Clients::with([
           /// 'typeOfTrip',
           /// 'escort',
            'genderType',
            'clientStatus',
           /// 'requestType'
        ])->find($id);


        $clientdata = $this->convertSingleData($client);

        return response()->json([
            'data' => $clientdata,
         ///   'escortType'=> new StatusCollection($escort),
            "gender"=> new StatusCollection($gender),
           /// 'request_type'=> new StatusCollection($request_type),
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
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Clients $clients
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Clients $clients)
    {
        //
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

}
