<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarsCollection;
use App\Http\Resources\StatusCollection;
use App\Http\Resources\UserCollection;
use App\Http\Resources\VendorsCollection;
use App\Models\Cars;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\ClientTable;
use App\Models\Los;
use App\Models\PriceList;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $vendorCount = User::where('role_id', 2)->count();;
        $operatorCount = User::where(['role_id' => 4, "vendor_id" => 1])->count();;
        if (isset($request->queryData) and (int)$request->typeId == 2) {
            $vendorData = User::where(['role_id' => 2])->where('name', 'LIKE', '%' . $request->queryData . '%');
        } else if (isset($request->queryData) and (int)$request->typeId !== 2) {
            $vendorData = User::where(['role_id' => 4, "vendor_id" => 1])->where('name', 'LIKE', '%' . $request->queryData . '%');

        } else {
            if ((int)$request->typeId !== 2) {
                $vendorData = User::where(['role_id' => $request->typeId, "vendor_id" => 1]);

            } else {
                $vendorData = User::where(['role_id' => $request->typeId]);
            }
        }
        $vendorData = $vendorData->with('fields', 'los')
            ->get();
        return response()->json(
            [
                'data' => new VendorsCollection($vendorData),
                'operators' => $operatorCount,
                'vendors' => $vendorCount,
            ],
            200
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        $clientTable = ClientTable::get();
        /// $users = User::get();
        $status = ClientStatus::get();
        $los = Los::get();
        return response()->json(
            [
                'status' => new StatusCollection($status),
                'fields' => new StatusCollection($clientTable),
                'los' => new StatusCollection($los),
            ],
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make((array)json_decode($request->value), [
            'companyName' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'string',
            //  'status' => 'required',
            'address' => 'string',
            'fields' => 'required',
            'los' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(
                [
                    'success' => 0,
                    'type' => 'validation_filed',
                    'error' => $validator->messages(),
                ],
                422
            );
        }

        $requestData = $validator->validated();

        $vendor = new User([
            'name' => $requestData['companyName'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            ///  'status' => json_decode($request->value)->status->id,
            'address' => $requestData['address'],
            'password' => bcrypt($requestData['password']),
            'role_id' => 2,
        ]);
        if (!$vendor->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                200
            );
        } else {
            $vendor->vendor_id = $vendor->id;
            $vendor->save();

            $idCats = array_column($requestData['fields'], 'id');
            $vendor->fields()->sync($idCats);
            $idLos = array_column($requestData['los'], 'id');
            $vendor->los()->sync($idLos);
        }
        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        );
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Vendor $vendor
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Vendor $vendor)
    {
        dd('a');
        $status = DB::table('status')->get();
        $users = User::get();

        return response()->json(
            [
                'data' => $vendor,
                'users' => new StatusCollection($users),
                'status' => new StatusCollection($status),
            ],
            200
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request)
    {
        $vendorData = User::with('fields', 'los')
            ->where('id', $request->id)
            ->first();
        $clientTable = ClientTable::get();
        $losData = Los::get();

        return response()->json(
            [
                'data' => [
                    'id' => $vendorData->id,
                    'companyName' => $vendorData->name,
                    'email' => $vendorData->email,
                    'address' => $vendorData->address,
                    'phone_number' => $vendorData->phone_number,
                    'fields' => new StatusCollection($vendorData->fields),
                    'los' => new StatusCollection($vendorData->los),
                ], ///  new VendorsCollection($vendor),
                'fields' => new StatusCollection($clientTable),
                'los' => new StatusCollection($losData),
                ///   'users' => new StatusCollection($users),
                ///    'status' => new StatusCollection($status)
            ],
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Vendor $vendor
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Vendor $vendor)
    {
        $validator = Validator::make((array)json_decode($request->value), [
            'companyName' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|unique:users,email,' . $request->id,
            ///  'status' => 'required',
            'address' => 'string',
            'fields' => 'array',
            'los' => 'array',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'success' => 0,
                    'type' => 'validation_filed',
                    'error' => $validator->messages(),
                ],
                422
            );
        }
        $requestData = $validator->validated();
        User::find($request->id)->update([
            'name' => $requestData['companyName'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            /// 'status' => json_decode($request->value)->status->id,
            'address' => $requestData['address'],
            ///'password' =>  bcrypt($requestData['password']),
            /// 'role_id' => 2,
        ]);
        $idCats = array_column($requestData['fields'], 'id');

        $vendorData = User::find($request->id);

        $vendorData->fields()
            ->sync($idCats);
        $idLos = array_column($requestData['los'], 'id');
        $vendorData->los()->sync($idLos);
        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        ); //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor)
    {
        //
    }

    public function getVendorUsers($id, $tabId)
    {
        $operatorsCount = User::where(['role_id' => 4, "vendor_id" => $id])->count();;
        $driverCount = User::where(['role_id' => 3, "vendor_id" => $id])->count();;
        $carsCount = Cars::where("vendor_id", $id)->count();

        if ((int)$tabId === 5) {
            $cars = Cars::where('vendor_id', $id)->with('make', 'year', 'model', 'driver', 'driver.user')->orderBy('make_id', 'asc')->get();

        } else {
            if (isset($request->querySearch)) {
                $vendorData = User::where(['role_id' => $tabId, "vendor_id" => $id]);
            } else {
                $vendorData = User::where(['role_id' => $tabId, "vendor_id" => $id])
                    ->with('fields');
            }
            $vendorData = $vendorData->orderBy('name', 'asc')->get();
        }


        return response()->json(
            [
                'data' => (int)$tabId === 5 ? new CarsCollection($cars) : new UserCollection($vendorData),
                'operators' => $operatorsCount,
                'drivers' => $driverCount,
                'cars' => $carsCount
            ],
            200
        );
    }

    public function getVendorDataSelect()
    {
        $vendorData = User::where('role_id', 2)->get();
        return response()->json(
            [
                'data' => new StatusCollection($vendorData),
            ],
            200
        );
    }

    public function setVendorTtoClient(Request $request)
    {
        $clientsIds = $request->ids;
        $vendorId = $request->vendorId;
        $operatorId = $request->user()->id;
        $user = User::find($vendorId);
        $losIds = $user->los->pluck('id')->toArray();
        $price = 0;
        if (count($clientsIds) === 1) {
            $client = Clients::find($clientsIds[0]);
            if (gettype(array_search($client->los_id, $losIds)) == 'integer') {
                $priceLists = PriceList::where(['los_id' => $client->los_id, 'vendor_id' => $vendorId])->get();
                foreach ($priceLists as $priceList) {
                    if (($priceList->service_id === 5 && $client->stairchair_id > 1) || ($priceList->service_id === 4 && $client->waitDuration > 1) || ($priceList->service_id === 3 && $client->artificial_id > 1) || ($priceList->service_id === 2 or $priceList->service_id === 2)) {
                        $price = $this->calculatePrice($priceList, $price, $client->miles);
                    }
                }

                $client->price = $price;
                $client->vendor_id = $vendorId;
                $client->type_id = 1;
                $client->operator_id = $operatorId;
                $client->update();
                $this->createAction($operatorId, $clientsIds[0], 8, $vendorId);
            } else {
                return response()->json(
                    [
                        'success' => 0,
                        //'type' => 'validation_filed',
                        'error' => 'Check LOS',
                    ],
                    200
                );
            }


            return response()->json([
                'success' => 1,
            ], 200);
        } else {
            foreach ($clientsIds as $id) {
                $this->createAction($operatorId, $id, 8, $vendorId);

            }
        }


        ///    $clients = Clients::whereIn('id', $clientsIds)->whereIn('los_id', $losIds)->update(["vendor_id" => $vendorId, 'type_id' => 1, 'operator_id' => $operatorId]);
//        if ($clients) {
//            foreach ($clientsIds as $id) {
//                $this->createAction($operatorId, $id, 8, $vendorId);
//
//            }
//
//            return response()->json([
//                'success' => 1,
//            ], 200);
//        } else {
//            return response()->json(
//                [
//                    'success' => 0,
//                    //'type' => 'validation_filed',
//                    'error' => 'something wrong with your reqeuest',
//                ],
//                200
//            );
//        }

    }

    public function getVendorsByLosId($id)
    {
        $vendorData = User::whereHas('los', function ($query) use ($id) {
            $query->where('los.id', $id);
        })->get();

        return response()->json(
            [
                'data' => new StatusCollection($vendorData),
            ],
            200
        );
    }

    public function audit(Request $request)
    {
        $user = User::find(4);
        return response()->json(
            [
                $user->revisionHistory,
                //'type' => 'validation_filed',
                'error' => 'something wrong with your reqeuest',
            ],
            200
        );
    }
}
