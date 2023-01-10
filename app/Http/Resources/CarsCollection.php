<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CarsCollection extends ResourceCollection
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
                ///'vendor_id' =>$vendor->vendor_id,
                'make'=> $vendor->make,
                'model'=> $vendor->model,
                'year'=> $vendor->year,
                'registration'=> $vendor->registration,
                'inspection'=> $vendor->inspection,
                'insurance'=> $vendor->insurance,
                'liability'=> $vendor->liability,
            ];
        });
    }
}
