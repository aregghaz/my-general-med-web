<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class VendorsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->map(function ($vendor) {
            $fields = [];
            if (count($vendor->fields)) {
                for ($i = 0; $i < count($vendor->fields); $i++) {
                    $fields[] = $vendor->fields[$i]->name;

                }
            }
            $losService = [];
            if (count($vendor->los)) {
                for ($i = 0; $i < count($vendor->los); $i++) {
                    $losService[] = $vendor->los[$i]->name;

                }
            }
            $pages = [];
            if (count($vendor->pages)) {
                for ($i = 0; $i < count($vendor->pages); $i++) {
                    $pages[] = $vendor->pages[$i]->name;

                }
            }
            if($vendor->role_id === 2){
                return [
                    'id' => $vendor->id,
                    "companyName" => $vendor->name,
                    "email" => $vendor->email,
                    'address' => $vendor->address,
                    'phone_number' => $vendor->phone_number,
                    /// 'birthday' => $vendor->phone_number,
                    'fields' => $fields,
                    'losService' => $losService,
                    'pages' => $pages
                ];
            }else{
                return [
                    'id' => $vendor->id,
                    "companyName" => $vendor->name,
                    "email" => $vendor->email,
                    'address' => $vendor->address,
                    'phone_number' => $vendor->phone_number,
                    /// 'birthday' => $vendor->phone_number,
                    'fields' => $fields,
                 ////   'losService' => $losService,
                    'pages' => $pages
                ];
            }

        });
    }
}
