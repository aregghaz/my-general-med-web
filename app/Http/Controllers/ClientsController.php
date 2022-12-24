<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Http\Resources\ClientFieldCollection;
use App\Http\Resources\StatusCollection;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\RequestType;
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



        if (isset($request->querySearch)) {
            $clients = Clients::where('member_uniqie_identifer', 'LIKE', '%' . $request->querySearch . '%')->orWhere('car_id', 'LIKE', '%' . $request->querySearch . '%')->paginate(20);
        } else {
            $clients = Clients::with([
                'origin',
                'destination',
                'typeOfTrip',
                'escortType',
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
                'birthday'
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
     * @return \Illuminate\Http\Response->json()
     */
    public function show(Clients $clients, $id)
    {

        $request_type = RequestType::get();
        $clientStatus = ClientStatus::get();

        $client =  Clients::with([
            'origin',
            'destination',
            'typeOfTrip',
            'escortType',
            'clientStatus',
            'requestType'
        ])->find($id);


        $clientdata = $this->convertSingleData($client,$request_type,$clientStatus);
        
        return response()->json([
            'data' => $clientdata,
            
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

    public function convertSingleData($client,$request_type,$clientStatuss)
    {
      return [
            'id' => $client->id,
            'trip_id' => $client->trip_id,
            'name' => $client->name,
            'surname' => $client->surname,
            'gender' => $client->gender,
            'los' => $client->los,
            'phone_number' => $client->phone_number,
            'date_of_service' => $client->date_of_service,
            'appointment_time' => $client->appointment_time,
            'pick_up' => $client->pick_up,
            'drop_down' => $client->drop_down,
            'request_type' => new StatusCollection($request_type),
            ///seect
            'status' => new StatusCollection($clientStatuss),
            ///seect
            'origin_name' => $client->origin->name,
            'origin_street' => $client->origin->street,
            'origin_suite' => $client->origin->suite,
            'origin_city' => $client->origin->city,
            'origin_state' => $client->origin->state,
            'origin_postal' => $client->origin->postal,
            'origin_country' => $client->origin->country,
            'origin_phone' => $client->origin->phone,
            'origin_comment' => $client->origin_comment,
            'destination_name' => $client->destination->name,
            'destination_street' => $client->destination->street,
            'destination_suite' => $client->destination->suite,
            'destination_city' => $client->destination->city,
            'destination_state' => $client->destination->state,
            'destination_postal' => $client->destination->postal,
            'destination_country' => $client->destination->country,
            'destination_phone' => $client->destination->phone,
            'destination_comment' => $client->destination_comment,
            'escortType' => $client->escortType,
            //select
            'typeOfTrip' => $client->typeOfTrip->name,
            //select
            'miles' => $client->miles,
            'member_uniqie_identifer' => $client->member_uniqie_identifer,
            'birthday' => $client->birthday,
        ];
    }
}
