<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientCollection;
use App\Models\Clients;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getClientsDataForDriver(Request $request){
        $vendorId = $request->user()->vendor_id;
        $carId = $request->user()->driver->car_id;
        $clients = Clients::with([
            'genderType',
            'clientStatus',
            'requestType'
        ])->where(['vendor_id'=> $vendorId, 'car_id' =>$carId ])->get();
        return response()->json([
            'clients' =>new ClientCollection($clients),
            'success' => 1,
        ], 200);
    }

    public function getClientDataForDriver($id){
        $client = Clients::find($id)->with([
            'genderType',
            'clientStatus',
            'requestType'
        ])->first();
        return response()->json([
            'client' =>  $this->convertSingleData($client),
        ], 200);
    }
}
