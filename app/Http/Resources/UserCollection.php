<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->map(function ($user) {

            return [
                'id' => $user->id,
                'fullName' => $user->name.' ' .$user->surname,
                'email' => $user->email,
                'address' => $user->address,
                'phone_number' => $user->phone_number,
                'birthday' => $user->birthday,
//                "image" => $user->picture ?? null,
            ];
        });

    }
}
