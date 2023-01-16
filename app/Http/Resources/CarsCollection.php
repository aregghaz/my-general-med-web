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
            $users = [];

            if(count($vendor->driver)){
                for($i=0;$i< count($vendor->driver); $i++){
                    $users[] = $vendor->driver[$i]->user->name .' '.$vendor->driver[$i]->user->surname;
                }
            }
            return [
                'id' => $vendor->id,
                "drivers" =>$users,
                ///'vendor_id' =>$vendor->vendor_id,
                'make'=> $vendor->make->name,
                'model'=> $vendor->model->name,
                'year'=> $vendor->year->name,
//                'registration'=> $vendor->registration,
//                'inspection'=> $vendor->inspection,
//                'insurance'=> $vendor->insurance,
//                'liability'=> $vendor->liability,
            ];
        });
    }
}
