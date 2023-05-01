<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleCollection;
use App\Http\Resources\StatusCollection;
use App\Http\Resources\UserCollection;
use App\Models\ClientStatus;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected function getRole($id)
    {

    }

    public function index(Request $request)
    {
        $users = new User;
        if ($request->input('tabId')) {
            $users = $users->where('role_id', $request->input('tabId'));
        }
        $roles = Role::withCount('users')->get();

        $users = $users->orderBy('name', 'asc')->get();
        ///  $users = User::get();
        return response()->json([
            'data' => new UserCollection($users),
            'roles' => new RoleCollection($roles),

        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        $role = Role::get();
        $status = ClientStatus::get();
        return response()->json([
            "role" => new RoleCollection($role),
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
            'surname' => 'string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email|unique:users',
            ///'password' => 'required|string|confirmed',
            'birthday' => 'string',
            'address' => 'string',
            // 'address' => 'string',

        ]);
        if ($validator->fails()) {
            return response()->json(['success' => 0, 'type' => 'validation_filed', 'error' => $validator->messages()], 422);
        }
        $requestData = $validator->validated();
        $user = new User([
            'name' => $requestData['name'],
            'surname' => $requestData['surname'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            /////TODO CHANGE IT
            //// 'password' => bcrypt($requestData['password']),
            'password' => bcrypt('admin'),
            'birthday' => date('Y-m-d', strtotime($requestData['birthday'])),
            'address' => $requestData['address'],
            // 'state_id' => $state->id,
        ]);
        if (!$user->save()) {
            return response()->json([
                'success' => '0',
                'type' => 'forbidden',
            ], 403);
        }
        // $user->notify(
        //     new UserCreateNotification($user)
        // );
        return response()->json([
            'success' => '1',
            'type' => 'success',
            'status' => 200
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $role = Role::get();

        $data = User::findOrFail($id);
        return response()->json([
            'data' => $data,
            "role" => $role
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, User $user)
    {

        $validator = Validator::make((array)json_decode($request->value), [
            'name' => 'required|string',
            'surname' => 'string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email',
            ///'password' => 'required|string|confirmed',
            'birthday' => 'string',
            'business_address' => 'string',
            // 'address' => 'string',

        ]);
        if ($validator->fails()) {
            return response()->json(['success' => 0, 'type' => 'validation_filed', 'error' => $validator->messages()], 422);
        }
        $requestData = $validator->validated();

        User::update([
            'name' => $requestData['name'],
            'surname' => $requestData['surname'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            /////TODO CHANGE IT
            //// 'password' => bcrypt($requestData['password']),
            'birthday' => date('Y-m-d', strtotime($requestData['birthday'])),
            'business_address' => $requestData['business_address'],
            // 'state_id' => $state->id,
        ]);
        return response()->json([
            'success' => '1',
            'type' => 'success',
            'status' => 200
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
