<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getClientDataDriver(Request $request){
        $vendorId = $request->user()->vendor_id;
        $carId = $request->user()->driver->car_id;
        $clients = Clients::where(['vendor_id'=> $vendorId, 'car_id' =>$carId ])->get();
        return response()->json([
            'clients' =>$clients,
            'success' => 1,
        ], 200);
    }
}
