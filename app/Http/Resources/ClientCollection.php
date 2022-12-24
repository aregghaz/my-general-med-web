<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ClientCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->map(function ($client) {

            return [
                ////  "client_id" => $client->id,
                /// 'car_id'=> $client->car_id,
                /// 'vendor_id'=> $client->vendor_id,   
                'id' => $client->id,
                'trip_id' => $client->trip_id,
                'name' => $client->name,
                'surname' => $client->surname,
                
                'los' => $client->los,
                'gender' => $client->genderType->name,
                'phone_number' => $client->phone_number,
                'date_of_service' => $client->date_of_service,
                'appointment_time' => $client->appointment_time,
                'pick_up' => $client->pick_up,
                'drop_down' => $client->drop_down,
                'request_type' => $client->requestType->name, ///seect
                'status' => $client->clientStatus->name, ///seect
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
                'escortType' => $client->escortType, //select
                'typeOfTrip' => $client->typeOfTrip->name, //select
                'miles' => $client->miles,
                'member_uniqie_identifer' => $client->member_uniqie_identifer,
                'birthday' => $client->birthday,
            ];
        });
    }
}
