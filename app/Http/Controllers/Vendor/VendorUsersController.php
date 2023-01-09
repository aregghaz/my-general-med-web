<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\ClientTable;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\UserCollection;
use App\Http\Resources\StatusCollection;
use App\Models\Driver;
use Validator;
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
        $roles = Role::where("id", ">" ,$request->user()->role_id )->get();
        return response()->json([
            // 'data' => new UserCollection($users),
            'roles' => new StatusCollection($roles),

        ], 200);

    }
    public function store(Request $request)
    {
        $data = json_decode($request->value);
        $validator = Validator::make((array)$data, [
            'name' => 'required|string',
            'surname' => 'string',
            //'phone_number' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'birthday' => 'string',
            'address' => 'string',
            // 'address' => 'string',

        ]);
        // $validator2 = Validator::make($request, [
        //     'license'=> 'required|mimes:doc,pdf,docx,zip',
        //     'picture'=> 'required|mimes:doc,pdf,docx,zip',
        //     'sex_offender_check'=> 'required|mimes:doc,pdf,docx,zip',
        //     'motor_vehicle_record'=> 'required|mimes:doc,pdf,docx,zip',
        //     'defensive_driving'=> 'required|mimes:doc,pdf,docx,zip',
        //     'wheelchair_securement'=> 'required|mimes:doc,pdf,docx,zip',
        //     'pass_bassic'=> 'required|mimes:doc,pdf,docx,zip',
        //     'emt_1'=> 'required|mimes:doc,pdf,docx,zip',
        //     'first_aid'=> 'required|mimes:doc,pdf,docx,zip',
        //     'company_training'=> 'required|mimes:doc,pdf,docx,zip',
        // ]);
        if ($validator->fails()) {
            return response()->json(['success' => 0, 'type' => 'validation_filed', 'error' => $validator->messages()], 422);
        }
        $requestData = $validator->validated();
        $user = new User([
            'name' => $requestData['name'],
            'surname' => $requestData['surname'],
            'vendor_id' => $request->user()->vendor_id,
            'email' => $requestData['email'],
            'role_id'=> 3,
            /////TODO CHANGE IT
             'password' => bcrypt($requestData['password']),
            ///'password' => bcrypt('admin'),
            'birthday' => date('Y-m-d', strtotime($requestData['birthday'])),
            'address' => $requestData['address'],
            'phone_number' => '12313',
        ]);
        if (!$user->save()) {
            return response()->json([
                'success' => '0',
                'type' => 'forbidden',
            ], 403);
        } else {
 
            $vendor = new Driver();
            
            $vendor->user_id = $user->id;

            $license = $request->file("license");
            $license_name = time()+1 . $license->getClientOriginalName();
            $license->move("uploads/$request->user()->vendor_id/$user->id", $license_name);
            $vendor->license = $license_name;
            
            $picture = $request->file("picture");
            $picture_name = time()+2 . $picture->getClientOriginalName();
            $picture->move("uploads/$request->user()->vendor_id/$user->id", $picture_name);
            $vendor->picture = $picture_name;

            $sex_offender_check = $request->file("sex_offender_check");
            $sex_offender_check_name = time()+3 . $sex_offender_check->getClientOriginalName();
            $sex_offender_check->move("uploads/$request->user()->vendor_id/$user->id", $sex_offender_check_name);
            $vendor->sex_offender_check = $sex_offender_check_name;

            $motor_vehicle_record = $request->file("motor_vehicle_record");
            $motor_vehicle_record_name = time() +4 . $motor_vehicle_record->getClientOriginalName();
            $motor_vehicle_record->move("uploads/$request->user()->vendor_id/$user->id", $motor_vehicle_record_name);
            $vendor->motor_vehicle_record = $motor_vehicle_record;

            $defensive_driving = $request->file("defensive_driving");
            $defensive_driving_name = time() +5 . $defensive_driving->getClientOriginalName();
            $defensive_driving->move("uploads/$request->user()->vendor_id/$user->id", $defensive_driving_name);
            $vendor->defensive_driving = $defensive_driving_name;


            $wheelchair_securement = $request->file("wheelchair_securement");
            $wheelchair_securement_name = time() +6 . $wheelchair_securement->getClientOriginalName();
            $wheelchair_securement->move("uploads/$request->user()->vendor_id/$user->id", $wheelchair_securement_name);
            $vendor->wheelchair_securement = $defensive_driving_name;

            $pass_bassic = $request->file("pass_bassic");
            $pass_bassic_name = time() +7 . $pass_bassic->getClientOriginalName();
            $pass_bassic->move("uploads/$request->user()->vendor_id/$user->id", $pass_bassic_name);
            $vendor->pass_bassic = $pass_bassic_name;

            $emt_1 = $request->file("emt_1");
            $emt_1_name = time() +8 . $emt_1->getClientOriginalName();
            $emt_1->move("uploads/$request->user()->vendor_id/$user->id", $emt_1_name);
            $vendor->emt_1 = $emt_1_name;
          
            $first_aid = $request->file("first_aid");
            $first_aid_name = time() +9 . $first_aid->getClientOriginalName();
            $first_aid->move("uploads/$request->user()->vendor_id/$user->id", $first_aid_name);
            $vendor->first_aid = $first_aid_name;
          
            $company_training = $request->file("company_training");
            $company_training_name = time() +10 . $company_training->getClientOriginalName();
            $company_training->move("uploads/$request->user()->vendor_id/$user->id", $company_training_name);
            $vendor->company_training = $company_training_name;
            $vendor->save();
          
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
}
