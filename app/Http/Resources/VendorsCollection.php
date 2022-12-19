<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class VendorsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->map(function ($vendor) {
            return [
                'id' => $vendor->id,
                "name" => $vendor->name,
                'address' => $vendor->address,
                'phone_number' => $vendor->phone_number,
                'status' => $vendor->status,
            ];
        });
    }
}
