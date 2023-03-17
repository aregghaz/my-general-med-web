<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class StatusTableCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return $this->map(function ($status) {

            return [
                'id' => $status->id,
                //'label' => $status->name,
                'fieldName' => $status->name,
                'slug' => $status->slug,
                //"price"=> isset($status->price),

            ];
        });
    }
}
