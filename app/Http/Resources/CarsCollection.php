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
        return $this->map(function ($cars) {
            $users = [];

            if(count($cars->driver)){
                for($i=0;$i< count($cars->driver); $i++){
                    $users[] = $cars->driver[$i]->user->name .' '.$cars->driver[$i]->user->surname;
                }
            }
            return [
                'id' => $cars->id,
                "drivers" =>$users,
                ///'vendor_id' =>$cars->vendor_id,
                'make'=> $cars->make->name,
                'model'=> $cars->model->name,
                'year'=> $cars->year->name,
//                'registration'=> $cars->registration,
//                'inspection'=> $cars->inspection,
//                'insurance'=> $cars->insurance,
//                'liability'=> $cars->liability,
            ];
        });
    }
}
