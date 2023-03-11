<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class NotificationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->map(function ($data) {

            return [
                ///  'id' => $data->id,
                'id' => $data->id,
                'new' => $data->new ? 'new' : 'readed',
                "value_id"=> $data->value_id,
                'field' => $data->field,
                'type_id' =>  $data->getAction->name,
                'model' =>  $data->model
            ];
        });
    }
}
