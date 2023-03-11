<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\StatusCollection;
use App\Http\Resources\UserCollection;
use App\Models\ClientTable;
use App\Models\Driver;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;

class VendorUsersController extends Controller
{
    public function index(Request $request)
    {
        $vendorId = $request->user()->vendor_id;
        $users = User::where('vendor_id', $vendorId)->where(
            'id',
            '!=',
            $request->user()->id
        );
        if ($request->input('tabId')) {
            $users = $users->where('role_id', $request->input('tabId'));
        }
        $users = $users->orderBy('name', 'asc')->get();
        $roles = Role::where('id', '>', $request->user()->role_id)->withCount(['users' => function ($query) use ($vendorId) {
            $query->where('vendor_id', $vendorId);
        }])
            /// ->withCount('users')
            ->get();
        return response()->json(
            [
                'data' => new UserCollection($users),
                'roles' => new RoleCollection($roles)
            ],
            200
        );
    }

    public function edit(Request $request, $id)
    {
        $vendorData = User::with('fields', "driver")
            ->where('id', $id)
            ->first();

        $clientTable = ClientTable::get();
        return response()->json(
            [
                'data' => [
                    'id' => $vendorData->id,
                    'name' => $vendorData->name,
                    'surname' => $vendorData->surname,
                    'email' => $vendorData->email,
                    'address' => $vendorData->address,
                    'birthday' => $vendorData->birthday,
                    /// 'password' => $vendorData->password,
                    'phone_number' => $vendorData->phone_number,
                    'license' => $vendorData->driver->license,
                    'picture' => $vendorData->driver->picture,
                    'sex_offender_check' => $vendorData->driver->sex_offender_check,
                    'motor_vehicle_record' => $vendorData->driver->motor_vehicle_record,
                    'defensive_driving' => $vendorData->driver->defensive_driving,
                    'motor_vehicle_record_exp' => $vendorData->driver->motor_vehicle_record_exp,
                    'sex_offender_check_exp' => $vendorData->driver->sex_offender_check_exp,
                    'defensive_driving_exp' => $vendorData->driver->defensive_driving_exp,
                    'wheelchair_securement_exp' => $vendorData->driver->wheelchair_securement_exp,
                    'pass_basic_exp' => $vendorData->driver->pass_basic_exp,
                    'emt_1_exp' => $vendorData->driver->emt_1_exp,
                    'first_aid_exp' => $vendorData->driver->first_aid_exp,
                    'company_training_exp' => $vendorData->driver->company_training_exp,
                    'drug_test_exp' => $vendorData->driver->drug_test_exp,
                    'license_exp' => $vendorData->driver->license_exp,
                    'wheelchair_securement' => $vendorData->driver->wheelchair_securement,
                    'pass_basic' => $vendorData->driver->pass_basic,
                    'emt_1' => $vendorData->driver->emt_1,
                    'first_aid' => $vendorData->driver->first_aid,
                    'company_training' => $vendorData->driver->company_training,
                    'drug_test' => $vendorData->driver->drug_test,
                    'fields' => new StatusCollection($vendorData->fields),
                ],
                'fields' => new StatusCollection($clientTable),
            ],
            200
        );
    }

    public function create(Request $request)
    {
        $roles = Role::where('id', '>', $request->user()->role_id)->get();
        return response()->json(
            [
                'roles' => new StatusCollection($roles),
            ],
            200
        );
    }

    public function store(Request $request)
    {
        $data = json_decode($request->value);
        $validator = Validator::make((array)$data, [
            'name' => 'required|string',
            'surname' => 'string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'birthday' => 'string',
            'license_exp' => 'string',
            'sex_offender_check_exp' => 'string',
            'motor_vehicle_record_exp' => 'string',
            'address' => 'string',
            'phone_number' => 'string',
        ]);
        // $validator2 = Validator::make($request, [
        //     'license'=> 'required|mimes:doc,pdf,docx,zip',
        //     'picture'=> 'required|mimes:doc,pdf,docx,zip',
        //     'sex_offender_check'=> 'required|mimes:doc,pdf,docx,zip',
        //     'motor_vehicle_record'=> 'required|mimes:doc,pdf,docx,zip',
        //     'defensive_driving'=> 'required|mimes:doc,pdf,docx,zip',
        //     'wheelchair_securement'=> 'required|mimes:doc,pdf,docx,zip',
        //     'pass_basic'=> 'required|mimes:doc,pdf,docx,zip',
        //     'emt_1'=> 'required|mimes:doc,pdf,docx,zip',
        //     'first_aid'=> 'required|mimes:doc,pdf,docx,zip',
        //     'company_training'=> 'required|mimes:doc,pdf,docx,zip',
        // ]);
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
        $user = new User([
            'name' => $requestData['name'],
            'surname' => $requestData['surname'],
            'vendor_id' => $request->user()->vendor_id,
            'email' => $requestData['email'],
            'role_id' => 3,
            'license_exp' => $requestData['license_exp'],
            'sex_offender_check_exp' => $requestData['sex_offender_check_exp'],
            'motor_vehicle_record_exp' => $requestData['motor_vehicle_record_exp'],

            'password' => bcrypt($requestData['password']),
            'birthday' => date('Y-m-d', strtotime($requestData['birthday'])),
            'address' => $requestData['address'],
            'phone_number' => $requestData['phone_number'],
        ]);


        if (!$user->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                403
            );
        } else {
            $vendor = new Driver();
            $vendor->user_id = $user->id;
            if (!$vendor->save()) {
                return response()->json(
                    [
                        'success' => '0',
                        'type' => 'forbidden',
                    ],
                    403
                );
            }

            $userId = $vendor->id;
            $vendorId = $request->user()->vendor_id;

            $license = $request->file('license');
            $vendor->license = $this->getPdfFile($license, $vendorId, $userId);

            $picture = $request->file('picture');
            $vendor->picture = $this->getPdfFile($picture, $vendorId, $userId);

            $sex_offender_check = $request->file('sex_offender_check');
            $vendor->sex_offender_check = $this->getPdfFile($sex_offender_check, $vendorId, $userId);

            $motor_vehicle_record = $request->file('motor_vehicle_record');
            $vendor->motor_vehicle_record = $this->getPdfFile($motor_vehicle_record, $vendorId, $userId);

            $defensive_driving = $request->file('defensive_driving');
            $vendor->defensive_driving = $this->getPdfFile($defensive_driving, $vendorId, $userId);

            $wheelchair_securement = $request->file('wheelchair_securement');
            $vendor->wheelchair_securement = $this->getPdfFile($wheelchair_securement, $vendorId, $userId);

            $pass_basic = $request->file('pass_basic');
            $vendor->pass_basic = $this->getPdfFile($pass_basic, $vendorId, $userId);

            $emt_1 = $request->file('emt_1');
            $vendor->emt_1 = $this->getPdfFile($emt_1, $vendorId, $userId);

            $first_aid = $request->file('first_aid');
            $vendor->first_aid = $this->getPdfFile($first_aid, $vendorId, $userId);

            $company_training = $request->file('company_training');
            $vendor->company_training = $this->getPdfFile($company_training, $vendorId, $userId);

            $drug_test = $request->file('drug_test');
            $vendor->drug_test = $this->getPdfFile($drug_test, $vendorId, $userId);

            if ($vendor->save()) {
                $this->saveNotification('driver', 'license', $vendor->id, 7);

            };
        }
        // $user->notify(
        //     new UserCreateNotification($user)
        // );
        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        );
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $requestData = json_decode($request->value);

        $user = User::find((int)$id);
        $user->name = $requestData->name;
        $user->surname = $requestData->surname;
        $user->email = $requestData->email;
        if (isset($requestData->password)) {
            $user->password = bcrypt($requestData->password);
        }
        $user->birthday = date('Y-m-d', strtotime($requestData->birthday));
        $user->address = $requestData->address;
        $user->phone_number = $requestData->phone_number;


        $carId = $id;

        if (!$user->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                403
            );
        }
        $vendor = Driver::where('user_id', $id)->first();
        $userId = $id;
        $vendorId = $request->user()->vendor_id;
        if ($request->hasFile('license')) {
            if (is_file(public_path($vendor->license))) {
                $oldImage = public_path($vendor->license);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $license = $request->file('license');
            $this->saveNotification('driver', 'license', $id, 9);
            $vendor->license_exp = date('Y-m-d', strtotime($requestData->license_exp));
            $vendor->license = $this->getPdfFile($license, $vendorId, $userId);
            $this->saveNotification('driver', 'license', $id, 9);

        }


        if ($request->hasFile('picture')) {
            if (is_file(public_path($vendor->picture))) {
                $oldImage = public_path($vendor->picture);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $picture = $request->file('picture');
            $vendor->picture = $this->getPdfFile($picture, $vendorId, $userId);
        }
        if ($request->hasFile('sex_offender_check')) {
            if (is_file(public_path($vendor->sex_offender_check))) {
                $oldImage = public_path($vendor->sex_offender_check);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->sex_offender_check_exp = date('Y-m-d', strtotime($requestData->sex_offender_check_exp));
            $sex_offender_check = $request->file('sex_offender_check');
            $vendor->sex_offender_check = $this->getPdfFile($sex_offender_check, $vendorId, $userId);
            $this->saveNotification('driver', 'sex_offender_check', $id, 9);
        }
        if ($request->hasFile('motor_vehicle_record')) {
            if (is_file(public_path($vendor->motor_vehicle_record))) {
                $oldImage = public_path($vendor->motor_vehicle_record);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->motor_vehicle_record_exp = date('Y-m-d', strtotime($requestData->motor_vehicle_record_exp));
            $motor_vehicle_record = $request->file('motor_vehicle_record');
            $vendor->motor_vehicle_record = $this->getPdfFile($motor_vehicle_record, $vendorId, $userId);
            $this->saveNotification('driver', 'motor_vehicle_record', $id, 9);

        }

        if ($request->hasFile('defensive_driving')) {
            if (is_file(public_path($vendor->defensive_driving))) {
                $oldImage = public_path($vendor->defensive_driving);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->defensive_driving_exp = date('Y-m-d', strtotime($requestData->defensive_driving_exp));
            $defensive_driving = $request->file('defensive_driving');
            $vendor->defensive_driving = $this->getPdfFile($defensive_driving, $vendorId, $userId);
            $this->saveNotification('driver', 'defensive_driving', $id, 9);

        }
        if ($request->hasFile('wheelchair_securement')) {
            if (is_file(public_path($vendor->wheelchair_securement))) {
                $oldImage = public_path($vendor->wheelchair_securement);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->wheelchair_securement_exp = date('Y-m-d', strtotime($requestData->wheelchair_securement_exp));
            $wheelchair_securement = $request->file('wheelchair_securement');
            $vendor->wheelchair_securement = $this->getPdfFile($wheelchair_securement, $vendorId, $userId);
            $this->saveNotification('driver', 'wheelchair_securement', $id, 9);

        }

        if ($request->hasFile('pass_basic')) {
            if (is_file(public_path($vendor->pass_basic))) {
                $oldImage = public_path($vendor->pass_basic);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->pass_basic_exp = date('Y-m-d', strtotime($requestData->pass_basic_exp));

            $pass_basic = $request->file('pass_basic');
            $vendor->pass_basic = $this->getPdfFile($pass_basic, $vendorId, $userId);
            $this->saveNotification('driver', 'pass_basic', $id, 9);

        }
        if ($request->hasFile('emt_1')) {
            if (is_file(public_path($vendor->emt_1))) {
                $oldImage = public_path($vendor->emt_1);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->emt_1_exp = date('Y-m-d', strtotime($requestData->emt_1_exp));
            $emt_1 = $request->file('emt_1');
            $vendor->emt_1 = $this->getPdfFile($emt_1, $vendorId, $userId);
            $this->saveNotification('driver', 'emt_1', $id, 9);

        }

        if ($request->hasFile('first_aid')) {
            if (is_file(public_path($vendor->first_aid))) {
                $oldImage = public_path($vendor->first_aid);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->first_aid_exp = date('Y-m-d', strtotime($requestData->first_aid_exp));

            $first_aid = $request->file('first_aid');
            $vendor->first_aid = $this->getPdfFile($first_aid, $vendorId, $userId);
            $this->saveNotification('driver', 'first_aid', $id, 9);

        }


        if ($request->hasFile('company_training')) {
            if (is_file(public_path($vendor->company_training))) {
                $oldImage = public_path($vendor->company_training);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->company_training_exp = date('Y-m-d', strtotime($requestData->company_training_exp));

            $company_training = $request->file('company_training');
            $vendor->company_training = $this->getPdfFile($company_training, $vendorId, $userId);
            $this->saveNotification('driver', 'company_training', $id, 9);

        }

        if ($request->hasFile('drug_test')) {
            if (is_file(public_path($vendor->drug_test))) {
                $oldImage = public_path($vendor->drug_test);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $vendor->drug_test_exp = date('Y-m-d', strtotime($requestData->drug_test_exp));

            $drug_test = $request->file('drug_test');
            $vendor->drug_test = $this->getPdfFile($drug_test, $vendorId, $userId);
            $this->saveNotification('driver', 'drug_test', $id, 9);

        }
        $vendor->update();

        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        );
    }

    protected function getPdfFile($file, $vendorId, $userId): string
    {
        $fileData = $file;
        $file_name =
            time() + Rand(1, 700) . $file->getClientOriginalName();
        $fileData->move(
            public_path() . "/uploads/$vendorId/drivers/$userId/",
            $file_name
        );
        return "/uploads/$vendorId/drivers/$userId/$file_name";
    }

    public function show($id)
    {
        $vendorData = User::with('fields', "driver")
            ->where('id', $id)
            ->first();

        return response()->json(
            [
                'id' => $vendorData->id,
                'fullname' => $vendorData->name . ' ' . $vendorData->surname,
                'email' => $vendorData->email,
                'address' => $vendorData->address,
                'birthday' => $vendorData->birthday,
                /// 'password' => $vendorData->password,
                'phone_number' => $vendorData->phone_number,
                'license' => $vendorData->driver->license,
                'picture' => $vendorData->driver->picture,
                'sex_offender_check' => $vendorData->driver->sex_offender_check,
                'sex_offender_check_exp' => $vendorData->driver->sex_offender_check_exp,
                'motor_vehicle_record' => $vendorData->driver->motor_vehicle_record,
                'motor_vehicle_record_exp' => $vendorData->driver->motor_vehicle_record_exp,
                'defensive_driving' => $vendorData->driver->defensive_driving,
                'wheelchair_securement' => $vendorData->driver->wheelchair_securement,
                'pass_basic' => $vendorData->driver->pass_basic,
                'emt_1' => $vendorData->driver->emt_1,
                'first_aid' => $vendorData->driver->first_aid,
                'company_training' => $vendorData->driver->company_training,
                'drug_test' => $vendorData->driver->drug_test,
                'fields' => new StatusCollection($vendorData->fields),
            ],
            200
        );
    }
}
