<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\ClientTable;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\UserCollection;
use App\Http\Resources\StatusCollection;
class VendorUsersController extends Controller
{
    public function index(Request $request){
        $users =  User::where('vendor_id', $request->user()->id)->where('id','!=', $request->user()->id);
        if ($request->input('tabId')) {

            $users = $users->where('role_id',$request->input('tabId'));
        } 
    
        $users = $users->get();
      ///  $users = User::get();
      $roles = Role::where("id", ">" ,$request->user()->role_id )->withCount('users')->get();
     ///   dd($users);
      return response()->json([
            'data' => new UserCollection($users),
            'roles' => new RoleCollection($roles),

        ], 200);
    }

    public function edit(Request $request,  $id){
        {
            $vendorData = User::with('fields')->where('id',$id)->first();
            $clientTable = ClientTable::get();
     
           
            return response()->json([
                "data" =>[
                    'id' => $vendorData->id,
                    "companyName" => $vendorData->name,
                    "email" => $vendorData->email,
                    'address' => $vendorData->address,
                    'phone_number' => $vendorData->phone_number,
                    'fields' => new StatusCollection($vendorData->fields)
                ],///  new VendorsCollection($vendor),
                'fields' => new StatusCollection($clientTable)
             ///   'users' => new StatusCollection($users),
            ///    'status' => new StatusCollection($status)
            ], 200);
        }
    }
    public function create(Request $request)
    {
        $roles = Role::where("id", ">" ,$request->user()->role_id )->withCount('users')->get();
        return response()->json([
            // 'data' => new UserCollection($users),
            'roles' => new RoleCollection($roles),

        ], 200);

    }
}
