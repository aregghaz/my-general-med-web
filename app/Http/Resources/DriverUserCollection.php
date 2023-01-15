<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class DriverUserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->map(function ($driver) {

            return [
                'id' => $driver->id,
                'label' => $driver->user->name.' '.$driver->user->surname,
                'name' =>  $driver->user->name.' '.$driver->user->surname,
                "slug"=> $driver->id,
            ];
        });
    }
}
