<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleCollection;
use App\Http\Resources\StatusCollection;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserCollection;
use App\Models\Role;
use App\Models\Status;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\UserRequest;
use \Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    
        $users = User::get();
        return response()->json([
           'users' => new UserCollection($users),
           "count"=> count($users)
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $role = Role::get();
        $status = DB::table('status')->get();
        return response()->json([
            "role" =>  new RoleCollection( $role ),
            'status' => new StatusCollection($status)
         ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make( (array) json_decode($request->value), [
            'name' => 'required|string',
            'surname' => 'string',
            'phone_number' => 'required|string',
            'email' => 'required|string|email|unique:users',
            ///'password' => 'required|string|confirmed',
            'birthday' => 'string',
         'address' =>'string',
            // 'address' => 'string',
            
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => 0, 'type' => 'validation_filed', 'error' => $validator->messages()], 422);
        }
        $requestData = $validator->validated();
        // $state = json_decode($request->state);
   // dd($requestData);
        $user = new User([
            'name' => $requestData['name'],
            'surname' => $requestData['surname'],
            'phone_number' => $requestData['phone_number'],
            'email' => $requestData['email'],
            /////TODO CHANGE IT
           //// 'password' => bcrypt($requestData['password']),
            'password' => bcrypt('admin'),
            'birthday' => date ('Y-m-d', strtotime($requestData['birthday'])),
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
            'status'=> 200
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::get();
     
        $data = User::findOrFail($id);
        return response()->json([
            'user' => $data,
            "role" =>   $role 
         ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
