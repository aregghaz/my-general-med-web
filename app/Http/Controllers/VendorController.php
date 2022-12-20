<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendorRequest;
use App\Models\Vendor;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\VendorsCollection;

use App\Http\Resources\StatusCollection;
use Illuminate\Support\Facades\DB;
use \Validator;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vendorData = Vendor::paginate(20);

        if (isset($request->querySearch)) {


            $vendorData = Vendor::where('client_id', 'LIKE', '%' . $request->querySearch . '%')->orWhere('driver_id', 'LIKE', '%' . $request->querySearch . '%')->paginate(20);

        } else {


            $vendorData = Vendor::paginate(20);


        }


        return response()->json([
            "current_page" => $vendorData->toArray()['current_page'],
            "last_page" => $vendorData->toArray()['last_page'],
            "to" => 5,
            "total" => $vendorData->toArray()['total'],
            'vendors' => new VendorsCollection($vendorData),
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $status = DB::table('status')->get();
        $users = User::get();
        return response()->json([
            'users' => new StatusCollection($users),
            'status' => new StatusCollection($status)
        ], 200);
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
            'name' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email|unique:vendors',
            'address' => 'string',
//            'role' =>'string',
            // 'address' => 'string',

        ]);
        $requestData = $validator->validated();
        // $state = json_decode($request->state);

        $vendor = new Vendor([
            'name' => $requestData['name'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            'status' => json_decode($request->value)->status->id,
            'address' => $requestData['address'],
        ]);
        if (!$vendor->save()) {
            return response()->json([
                'success' => '0',
                'type' => 'forbidden',
            ], 200);
        }
        return response()->json([
            'success' => '1',
            'type' => 'success',
            'status' => 200
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function show(Vendor $vendor)
    {
        $status = DB::table('status')->get();
        $users = User::get();

        return response()->json([
            "data" => $vendor,
            'users' => new StatusCollection($users),
            'status' => new StatusCollection($status)
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function edit(Vendor $vendor)
    {
        $status = DB::table('status')->get();
        $users = User::get();

        return response()->json([
            "data" => $vendor,
            'users' => new StatusCollection($users),
            'status' => new StatusCollection($status)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Vendor $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vendor $vendor)
    {
        //
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
}
