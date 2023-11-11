<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FullNameCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->map(function ($user) {

            return [
                'id' => $user->driver->id,
                'label' => $user->name.' '.$user->surname,
                'name' =>  $user->name.' '.$user->surname,
                "slug"=> $user->id,
            ];
        });
    }
}
