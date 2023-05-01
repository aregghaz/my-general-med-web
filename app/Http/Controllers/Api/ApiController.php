<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientCollection;
use App\Models\Address;
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
            'requestType',
            'address'
        ])->where(['vendor_id' => $vendorId, 'car_id' => $carId])->whereIn('type_id', [1, 5]);
        ///->orWhere('type_id', 5);
        if (isset($request->search)) {
            $this->convertQuery($request->search, [], $clients);
        }
        $clients = $clients->get();
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
        $check = $this->checkTrips($carId);
        if (isset($check)) {
            return response()->json([
                'clientId' => $check->id,
                'tripId' => $check->trip_id,
                'status' => 1,
            ], 200);
        } else {
            Clients::find($id)->update([
                "type_id" => 5,
                'start_time' => date('H:i')
            ]);
        }

        return response()->json([
            'status' => 200,
        ], 200);
    }

    public function doneTrip(Request $request, $id)
    {
        $carId = $request->user()->driver->car_id;
        $check = $this->checkTrips($carId);
//        dd($check->id , $id);
        if (isset($check) and $check->id !== (int)$id) {
            return response()->json([
                'clientId' => $check->id,
                'tripId' => $check->trip_id,
                'status' => 1,
            ], 200);
        } else {
            $client = Clients::find($id);
            if ($client->type_id == 5) {
                $client->update([
                    "type_id" => 6,
                    'end_time' => date('H:i')
                ]);
            } else {
                return response()->json([
//                    'clientId' => $check->id,
//                    'tripId' => $check->trip_id,
                    'status' => 2,
                ], 200);
            }

        }
        return response()->json([
            'status' => 200,
        ], 200);
    }

    public function clientRoute(Request $request, $id)
    {

        $clientAddress = Address::where('client_id', $id)->orderBy('step')->get();
        $addressData = [];
        foreach ($clientAddress as $index => $address) {
            if ($index === 0) {
                $addressData['origin'] = $address["address"];
            } else if ($index === count($clientAddress) - 1) {
                $addressData['destination'] = $address["address"];
            } else {
                $addressData['waypoint'][] = $address["address"];

            }


        }
        return response()->json($addressData, 200);
    }

    public function checkTrips($carId)
    {
        return Clients::where(['type_id' => 5, 'car_id' => $carId])->first();

    }
}
