<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatusCollection;
use App\Models\ClientStatus;
use App\Models\ClientTable;
use App\Models\Pages;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;

class OperatorController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $clientTable = $request->user()->fields;
        /// $users = User::get();
        $status = ClientStatus::get();
        $pages =$request->user()->pages;

        return response()->json(
            [
                'status' => new StatusCollection($status),
                'fields' => new StatusCollection($clientTable),
                'pages' => new StatusCollection($pages),
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
            'name' => 'required|string',
            'surname' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'string',
            //  'status' => 'required',
            'address' => 'string',
            'fields' => 'required',
            'pages' => 'required',
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


        if($request->user()->role->id === 1  || $request->user()->role->id === 4){
            $roleId = 4;
        }else{
            $roleId = 5;
        }
        $operator = new User([
            'name' => $requestData['name'],
            'surname' => $requestData['surname'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            ///  'status' => json_decode($request->value)->status->id,
            'address' => $requestData['address'],
            'password' => bcrypt($requestData['password']),
            'role_id' => $roleId,
            'vendor_id' => $request->user()->role->id === 1 ? 1 : $request->user()->role->id,
        ]);
        if (!$operator->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                200
            );
        } else {
            $idCats = array_column($requestData['fields'], 'id');
            $idPages = array_column($requestData['pages'], 'id');
            $operator->pages()->sync($idPages);
            $operator->fields()->sync($idCats);
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
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        $vendorData = User::with('fields')
            ->find($id);
        $clientTable = ClientTable::get();
        $pages =  $pages =$request->user()->pages;
        return response()->json(
            [
                'data' => [
                    'id' => $vendorData->id,
                    'name' => $vendorData->name,
                    'surname' => $vendorData->surname,
                    'email' => $vendorData->email,
                    'address' => $vendorData->address,
                    'phone_number' => $vendorData->phone_number,
                    'fields' => new StatusCollection($vendorData->fields),
                    'pages' => new StatusCollection($vendorData->pages),
                ],
                'pages' => new StatusCollection($pages),
                'fields' => new StatusCollection($clientTable),
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
    public function update(Request $request, $id)
    {
        $validator = Validator::make((array)json_decode($request->value), [
            'name' => 'required|string',
            'surname' => 'required|string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email',
            ///  'status' => 'required',
            'address' => 'string',
            'password' => 'string',
            'fields' => 'required',
            'pages' => 'required',
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

        User::find($id)->update([
            'name' => $requestData['name'],
            'surname' => $requestData['surname'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            'address' => $requestData['address'],
        ]);

        if (isset($requestData['password'])) {
            User::find($id)->update(['password' => bcrypt($requestData['password'])]);
        }
        $idCats = array_column($requestData['fields'], 'id');
        $idPages = array_column($requestData['pages'], 'id');

        User::find($id)
            ->fields()
            ->sync($idCats);
        User::find($id)
            ->pages()
            ->sync($idPages);

        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        ); //
    }

}
