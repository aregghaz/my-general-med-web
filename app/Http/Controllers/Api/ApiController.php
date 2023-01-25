<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientCollection;
use App\Models\Clients;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getClientsDataForDriver(Request $request){
        $vendorId = $request->user()->vendor_id;
        $carId = $request->user()->driver->car_id;
        $clients = Clients::with([
            'origin',
            'destination',
            'typeOfTrip',
            'escortType',
            'genderType',
            'clientStatus',
            'requestType'
        ])->where(['vendor_id'=> $vendorId, 'car_id' =>$carId ])->get();
        return response()->json([
            'clients' =>new ClientCollection($clients),
            'success' => 1,
        ], 200);
    }

    public function getClientDataForDriver($id){
        $client = Clients::find($id)->with([
            'origin',
            'destination',
            'typeOfTrip',
            'escortType',
            'clientStatus',
            'requestType'
        ])->first();
        return response()->json([
            'client' =>  $this->convertSingleData($client),
        ], 200);
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
