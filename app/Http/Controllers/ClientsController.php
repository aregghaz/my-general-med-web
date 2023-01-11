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



        if (isset($request->querySearch)) {
            $clients = Clients::where('member_uniqie_identifer', 'LIKE', '%' . $request->querySearch . '%')->orWhere('car_id', 'LIKE', '%' . $request->querySearch . '%')->paginate(20);
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
     * @return \Illuminate\Http\Response->json()
     */
    public function show(Clients $clients, $id)
    {

        $request_type = RequestType::get();
        $clientStatus = ClientStatus::get();
        $escort = Escort::get();
        $typeOfTrip = TypeOfTrip::get();
        $gender = Gender::get();
        $client =  Clients::with([
            'origin',
            'destination',
            'typeOfTrip',
            'escort',
            'genderType',
            'clientStatus',
            'requestType'
        ])->find($id);


        $clientdata = $this->convertSingleData($client);
        
        return response()->json([
            'data' => $clientdata,
            'escortType'=> new StatusCollection($escort),
            "gender"=> new StatusCollection($gender),
            'request_type'=> new StatusCollection($request_type),
            "type_of_trip" => new StatusCollection($typeOfTrip),
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

    public function convertSingleData($client)
    {
      

      return [
            'id' => $client->id,
            'trip_id' => $client->trip_id,
            'name' => $client->name,
            'surname' => $client->surname,
            'gender' => [
                'id' => $client->genderType->id,
                'label' => $client->genderType->name,
                'slug' =>  $client->genderType->slug,
                'value' => $client->genderType->slug,
            ],
            'los' => $client->los,
            'phone_number' => $client->phone_number,
            'date_of_service' => $client->date_of_service,
            'appointment_time' => $client->appointment_time,
            'pick_up' => $client->pick_up,
            'drop_down' => $client->drop_down,
            'request_type' => [
                'id' => $client->requestType->id,
                'label' => $client->requestType->name,
                'slug' =>  $client->requestType->slug,
                'value' => $client->requestType->slug,
            ],
            ///select
            
            'status' =>  [
                'id' => $client->clientStatus->id,
                'label' => $client->clientStatus->name,
                'slug' =>  $client->clientStatus->slug,
                'value' => $client->clientStatus->slug,
            ],
            ///select
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
            'escortType' =>   [
                'id' => $client->escort->id,
                'label' => $client->escort->name,
                'slug' =>  $client->escort->slug,
                'value' => $client->escort->slug,
            ],
            //select
            'type_of_trip' =>  [
                'id' => $client->typeOfTrip->id,
                'label' => $client->typeOfTrip->name,
                'slug' =>  $client->typeOfTrip->slug,
                'value' => $client->typeOfTrip->slug,
            ],
            //select
            'miles' => $client->miles,
            'member_uniqie_identifer' => $client->member_uniqie_identifer,
            'birthday' => $client->birthday,
            'height' => $client->height,
            'weight' => $client->weight,
        ];
    }
}
