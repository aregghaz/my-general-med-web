<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SelectAndPriceCollection extends ResourceCollection
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
                'label' => $status->name.' '.$status->price.'$',
                'name' => $status->name,
                "value"=> $status->price,
            ];
        });
    }
}
