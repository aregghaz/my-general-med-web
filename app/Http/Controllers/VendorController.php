<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendorRequest;
use App\Models\Vendor;
use App\Models\User;
use App\Models\ClientTable;
use App\Models\ClientStatus;
use Illuminate\Http\Request;
use App\Http\Resources\VendorsCollection;
use App\Http\Resources\UserCollection;

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
    public function index(Request $request)
    {
        /// $vendorData = Vendor::paginate(20);
        if (isset($request->querySearch)) {
            $vendorData = User::where('role_id', 2)->get();
        } else {
            $vendorData = User::where('role_id', 2)
                ->with('fields')
                ->get();
        }

        return response()->json(
            [
                'vendors' => new VendorsCollection($vendorData),
            ],
            200
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $clientTable = ClientTable::get();
        $users = User::get();
        $status = ClientStatus::get();
        return response()->json(
            [
                'status' => new StatusCollection($status),
                'fields' => new StatusCollection($clientTable),
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
        $validator = Validator::make((array) json_decode($request->value), [
            'companyName' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email|unique:vendors',
            'password' => 'string',
            //  'status' => 'required',
            'address' => 'string',
            'fields' => 'required',
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
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $vendorData = User::with('fields')
            ->where('id', $request->id)
            ->first();
        $clientTable = ClientTable::get();

        return response()->json(
            [
                'data' => [
                    'id' => $vendorData->id,
                    'companyName' => $vendorData->name,
                    'email' => $vendorData->email,
                    'address' => $vendorData->address,
                    'phone_number' => $vendorData->phone_number,
                    'fields' => new StatusCollection($vendorData->fields),
                ], ///  new VendorsCollection($vendor),
                'fields' => new StatusCollection($clientTable),
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vendor $vendor)
    {
        $validator = Validator::make((array) json_decode($request->value), [
            'companyName' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email',
            ///  'status' => 'required',
            'address' => 'string',
            'fields' => 'required',
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

        $vendor = User::find($request->id)->update([
            'name' => $requestData['companyName'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            /// 'status' => json_decode($request->value)->status->id,
            'address' => $requestData['address'],
            ///'password' =>  bcrypt($requestData['password']),
            'role_id' => 2,
        ]);
        $idCats = array_column($requestData['fields'], 'id');

        User::find($request->id)
            ->fields()
            ->sync($idCats);

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

    public function getVendorUsers($id)
    {
        $users = User::where('vendor_id', $id);
        // if ($request->input('tabId')) {

        //     $users = $users->where('role_id',$request->input('tabId'));
        // }

        $users = $users->get();

        return response()->json(
            [
                'data' => new UserCollection($users),
            ],
            200
        );
    }
}
