<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\StatusCollection;

class VendorEditCollection extends ResourceCollection
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
                "companyName" => $vendor->name,
                "email" => $vendor->email,
                'address' => $vendor->address,
                'phone_number' => $vendor->phone_number,
                'fields' => new StatusCollection($vendor->fields)
            ];
        });
    }
}
