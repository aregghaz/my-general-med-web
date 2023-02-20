<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ClientActivityCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->map(function ($action) {

            return [
                ///  'id' => $action->id,
                'id' => $action->getClient->id,
                "operator"=> $action->getOperator->name . ' ' . $action->getOperator->surname,
                'operatorAction' => $action->getAction->name,
              ///  'trip_id' =>  $action->getClient->trip_id,
                'companyName' => $action->getVendor->id == 1 ? '' : $action->getVendor->name,
                'created_at' =>   date("d-m-Y H:i:s", strtotime($action->created_at))
            ];
        });
    }
}
