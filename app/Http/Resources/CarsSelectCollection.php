<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CarsSelectCollection extends ResourceCollection
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
                    $users[] =[ 'label' =>  $cars->driver[$i]->user->name .' '.$cars->driver[$i]->user->surname , "value"=> $cars->id];
                }
            }
            return [
                "label"=> $cars->make->name,
                "options" => $users,

            ];
        });

    }
}
