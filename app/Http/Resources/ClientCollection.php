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
                'id' => $client->id,
                'trip_id' => $client->trip_id,
                'fullName' => $client->fullName,
                /// 'surname' => $client->surname,
                'gender' => $client->genderType->name,
                'los' => $client->los->name,
                ///'phone_number' => $client->phone_number,
                'date_of_service' => $client->date_of_service,
                'pick_up' => $client->pick_up,
                'drop_down' => $client->drop_down,
                'request_type' => $client->requestType->name,
                'status' => $client->clientStatus->name,
                'origin' => $client->origin,
                'origin_phone' => $client->origin_phone,
                'origin_comment' => $client->origin_comment,
                'destination' => $client->destination,
                'destination_phone' => $client->destination_phone,
                'destination_comment' => $client->destination_comment,
                'miles' => $client->miles,
                'member_uniqie_identifer' => $client->member_uniqie_identifer,
                'birthday' => $client->birthday,
                'height' => $client->height,
                'weight' => $client->weight,
                'additionalNote' => $client->additionalNote,
               //// 'operator_note' => $client->operator_note,
            ];
        });
    }
}
