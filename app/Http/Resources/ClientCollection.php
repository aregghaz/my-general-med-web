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
                'gender' => $client->genderType->name,
                'los' => $client->los->name,
                'date_of_service' => $client->date_of_service,
                'pick_up' =>  $client->address[0]->pick_up,
                ///  'drop_down' =>  $client->address[0]->drop_down,
                'address' =>  $client->address[0]->address,
                'comment' =>  $client->address[0]->address_comments,
                // 'comment' =>  $client->address[0]->address_comments,
                'request_type' => $client->requestType->name,
                'status' => $client->clientStatus->name,
                'miles' => $client->miles,
                'member_uniqie_identifer' => $client->member_uniqie_identifer,
                'weight' => $client->weight,
                //// 'operator_note' => $client->operator_note,
            ];
        });
    }
}
