<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientCollection;
use App\Models\Clients;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getClientsDataForDriver(Request $request)
    {
        $vendorId = $request->user()->vendor_id;
        $carId = $request->user()->driver->car_id;
        $clients = Clients::with([
            'genderType',
            'clientStatus',
            'requestType'
        ])->where(['vendor_id' => $vendorId, 'car_id' => $carId])->where('type_id', 1)->orWhere('type_id', 5)->get();
        return response()->json([
            'clients' => new ClientCollection($clients),
            'success' => 1,
        ], 200);
    }

    public function getClientDataForDriver($id)
    {
        $client = Clients::with([
            'genderType',
            'clientStatus',
            'requestType'
        ])->find($id);
        return response()->json([
            'client' => $this->convertSingleDataForInfo($client),
        ], 200);
    }

    public function startTrip(Request $request, $id)
    {
        $carId = $request->user()->driver->car_id;
        $check = Clients::where(['type_id' => 5, 'car_id' => $carId])->first();

        if (isset($check)) {

            return response()->json([
                'clientId' => $check->id,
                'tripId' => $check->trip_id,
                'status' => 1,
            ], 200);
        } else {
            $client = Clients::find($id)->update([
                "type_id" => 5,
                'start_time' => date('H:i')
            ]);
        }

        return response()->json([
            'status' => 200,
        ], 200);
    }

    public function doneTrip($id)
    {
        $client = Clients::find($id)->update([
            "type_id" => 6,
            'end_time' => date('H:i')
        ]);
        return response()->json([
            'status' => 200,
        ], 200);
    }

    public function clientRoute(Request $request, $id)
    {

        $client = Clients::find($id);

        return response()->json([
            'origin' => $client->origin,
            'origin_id' => $client->origin_id,
            'destination' => $client->destination,
            'destination_id' => $client->destination_id,
        ], 200);
    }
}
