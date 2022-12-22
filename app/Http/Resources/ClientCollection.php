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
//  dd( isset($client));
            return [
              ////  "client_id" => $client->id,
               /// 'car_id'=> $client->car_id,
               /// 'vendor_id'=> $client->vendor_id,    
                isset($client->trip_id) ?? 'trip_id'=> $client->trip_id,
                isset($client->name) ??'name'=> $client->name,
                isset($client->surname) ?? 'surname'=> $client->surname,
                isset($client->gender) ?? 'gender'=> $client->gender,
                isset($client->los) ??'los'=> $client->los,
                isset($client->phone_number) ??'phone_number'=> $client->phone_number,
                isset($client->date_of_service) ?? 'date_of_service'=> $client->date_of_service,
                isset($client->appointment_time) ??'appointment_time'=> $client->appointment_time,
                isset($client->trip_ipick_upd) ??'pick_up'=> $client->pick_up,
                isset($client->drop_down) ?? 'drop_down'=> $client->drop_down,
              ///  isset($client->trrequestType) ?? 'request_type'=> $client->requestType->name, ///seect
            //    isset($client->clientStatus->name) ??'status'=> $client->clientStatus->name,///seect
                // isset($client->origin->name) ??'origin_name'=> $client->origin->name,
                // isset($client->origin->name) ??'origin_street'=> $client->origin->street,
                // isset($client->origin->name) ?? 'origin_suite'=> $client->origin->suite,
                // isset($client->origin->name) ?? 'origin_city'=> $client->origin->city,
                // isset($client->origin->name) ??'origin_state'=> $client->origin->state,
                // isset($client->origin->name) ?? 'origin_postal'=> $client->origin->postal,
                // isset($client->origin->name) ??'origin_country'=> $client->origin->country,
                // isset($client->origin->name) ?? 'origin_phone'=> $client->origin->phone,
                // isset($client->origin->name) ?? 'origin_comment'=> $client->origin_comment,
                // isset($client->destination->name) ?? 'destination_name'=> $client->destination->name,
                // isset($client->destination->name) ??'destination_street'=> $client->destination->street,
                // isset($client->destination->name) ?? 'destination_suite'=> $client->destination->suite,
                // isset($client->destination->name) ?? 'destination_city'=> $client->destination->city,
                // isset($client->destination->name) ?? 'destination_state'=> $client->destination->state,
                // isset($client->destination->name) ??  'destination_postal'=> $client->destination->postal,
                // isset($client->destination->name) ?? 'destination_country'=> $client->destination->country,
                // isset($client->destination->name) ??  'destination_phone'=> $client->destination->phone,
                // isset($client->destination->name) ?? 'destination_comment'=> $client->destination_comment,
              //  isset($client->escortType) ?? 'escortType'=> $client->escortType,//select
               /// isset($client->typeOfTrip->name) ?? 'typeOfTrip'=> $client->typeOfTrip->name,//select
                isset($client->miles) ?? 'miles'=> $client->miles,
                isset($client->member_uniqie_identifer) ?? 'member_uniqie_identifer'=> $client->member_uniqie_identifer,
                isset($client->birthday) ?? 'birthday'=> $client->birthday,
            ];
        });

    }
}
