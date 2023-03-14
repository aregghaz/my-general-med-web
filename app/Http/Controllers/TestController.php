<?php

namespace App\Http\Controllers;

use App\Models\Driver;

class TestController extends Controller

{

    public function index()
    {
        $queryData = date('Y-m-d', strtotime("+60 days"));
        $driverData = Driver::where(function ($query) use ($queryData) {
            $query->where('sex_offender_check_exp', "<=", $queryData)
                ->orWhere('motor_vehicle_record_exp', "<=", $queryData)
                ->orWhere('license_exp', "<=", $queryData)
                ->orWhere('wheelchair_securement_exp', "<=", $queryData)
                ->orWhere('pass_basic_exp', "<=", $queryData)
                ->orWhere('emt_1_exp', "<=", $queryData)
                ->orWhere('first_aid_exp', "<=", $queryData)
                ->orWhere('company_training_exp', "<=", $queryData)
                ->orWhere('drug_test_exp', "<=", $queryData)
                ->orWhere('defensive_driving_exp', "<=", $queryData);
        })->select('sex_offender_check_exp',
            'motor_vehicle_record_exp',
            'license_exp',
            'defensive_driving_exp',
            'wheelchair_securement_exp',
            'pass_basic_exp',
            'emt_1_exp',
            'first_aid_exp',
            'company_training_exp',
            'drug_test_exp', 'user_id')->get()->toArray();

        foreach ($driverData as $data) {
            foreach ($data as $key => $value) {
                $actionid  = false;
              ///  dd(date('Y-m-d', strtotime("+15 days")) ,date('Y-m-d', strtotime($value)));
                if(date('Y-m-d', strtotime($value)) <  date('Y-m-d', strtotime("+15 days"))){
                    $actionid  = 14;
                }else if(date('Y-m-d', strtotime($value)) <  date('Y-m-d', strtotime("+30 days"))) {
                    $actionid  = 13;
                }else if(date('Y-m-d', strtotime($value)) <  date('Y-m-d', strtotime("+60 days"))) {
                    $actionid  = 12;
                }
           /// dd($data);
                ///
                if($actionid){
                    switch ($key) {
                        case 'sex_offender_check_exp' :
                            $this->saveNotification('driver', 'Sex Offender Check', $data['user_id'], $actionid);
                            break;
                        case 'license_exp' :
                            $this->saveNotification('driver', 'Driver License', $data['user_id'], $actionid);
                            break;
                        case 'defensive_driving_exp' :
                            $this->saveNotification('driver', 'Defensive Driving Certificate', $data['user_id'], $actionid);
                            break;
                        case 'wheelchair_securement_exp' :
                            $this->saveNotification('driver', 'Wheelchair Securement Certificate', $data['user_id'], $actionid);
                            break;
                        case 'pass_basic_exp' :
                            $this->saveNotification('driver', 'Pass Basic', $data['user_id'], $actionid);
                            break;
                        case 'emt_1_exp' :
                            $this->saveNotification('driver', 'EMT 1 Certificate', $data['user_id'], $actionid);

                            break;
                        case 'first_aid_exp' :
                            $this->saveNotification('driver', 'First Aid and CPR Certificate', $data['user_id'], $actionid);

                            break;
                        case 'company_training_exp' :
                            $this->saveNotification('driver', 'Company Training Letter', $data['user_id'], $actionid);
                            break;
                        case 'drug_test_exp' :
                            $this->saveNotification('driver', 'Drug Test', $data['user_id'], $actionid);
                            break;
                    }
                }

            }
        }

        dd(1);
    }

    //    public function index(Request $request)
//    {
//        /* open this for local file testing purposes only*/
//
//
//        /// DB::beginTransaction();
//
//        $vendorId = $request->user()->vendor_id;
//
//        $path = $request->file('file');
//        $csv_data = file_get_contents($path);
//        /// $data = \Excel::load($path)->get();
//        $rows = str_getcsv($csv_data, "\n");
//
//        $result = array();
//        foreach ($rows as $k => $row) {
//            if ($k > 0) {
//
//                $result[$k - 1] = str_getcsv($rows[$k], ',');
//            }
//        }
//        foreach ($result as $data) {
//            // $data = explode(",", $data[0]);
//            $trip_id = 0;
//            $name = 1;
//            $surname = 2;
//            $gender = 3;
//            $los = 4;
//            $phone_number = 5;
//            $date_of_service = 6;
//            $appointment_time = 7;
//            $pick_up = 8;
//            $drop_down = 8;
//            $request_type = 9;
//            $status = 10;
//            $originData = [11, 12, 13, 14, 15, 16, 17, 18];
//            $destinetionData = [20, 21, 22, 23, 24, 25, 26, 27];
//            $origin_comment = 19;
//            $destination_comments = 28;
//            $escortType = 29;
//            $type_of_trip = 30;
//            $miles = 31;
//            $member_uniqie_identifer = 32;
//            $birthday = 33;
//
//            //////Request Type
//            $requestTypeId = 0;
//            $checkRequestType = RequestType::where('name', $data[$request_type])->first();
//            if (isset($checkRequestType)) {
//                $requestTypeId = $checkRequestType->id;
//            } else {
//                $dataCreateRequest = RequestType::create([
//                    'name' => $data[$request_type],
//                    "slug" => $data[$request_type]
//                ]);
//                $requestTypeId = $dataCreateRequest->id;
//            }
//
////            //////Clinet Status
////            $checkStatus = ClientStatus::where('name', $data[$status])->first();
////            $statusId = 0;
////            if (isset($checkStatus)) {
////                $statusId = $checkStatus->id;
////            } else {
////                $dataCreate = ClientStatus::create([
////                    'name' => $data[$status],
////                    "slug" => $data[$status]
////                ]);
////                $statusId = $dataCreate->id;
////            }
//
////            //////Clinet Status
////            $checkStatus = ClientStatus::where('name', $data[$status])->first();
////            $statusId = 0;
////            if (isset($checkStatus)) {
////                $statusId = $checkStatus->id;
////            } else {
////                $dataCreate = ClientStatus::create([
////                    'name' => $data[$status],
////                    "slug" => $data[$status]
////                ]);
////                $statusId = $dataCreate->id;
////            }
//
//            //////Clinet gender
//            $genderData = Gender::where('name', $data[$gender])->first();
//            $genderType = 0;
//            if (isset($genderData)) {
//                $genderType = $genderData->id;
//            } else {
//                $dataCreate = Gender::create([
//                    'name' => $data[$gender],
//                    "slug" => $data[$gender]
//                ]);
//                $genderType = $dataCreate->id;
//            }
//
//            $losData = Los::where('name', $data[$los])->first();
//            $losType = 0;
//            if (isset($losData)) {
//                $losType = $losData->id;
//            } else {
//                $dataCreate = Los::create([
//                    'name' => $data[$los],
//                    "slug" => $data[$los]
//                ]);
//                $losType = $dataCreate->id;
//            }
//
////            //////Clinet escortType
////            $escortTypeData = Escort::where('name', (int)$data[$escortType] ? 'yes' : "no")->first();
////            $escortTypeId = 0;
////            if (isset($escortTypeData)) {
////                $escortTypeId = $escortTypeData->id;
////            } else {
////                $dataCreate = Escort::create([
////                    'name' => (int)$data[$escortType] ? 'yes' : "no",
////                    "slug" => (int)$data[$escortType] ? 'yes' : "no"
////                ]);
////                $escortTypeId = $dataCreate->id;
////            }
//            //   dd($data);
//            //////Clinet type_of_trip
////            $typeOfTripData = TypeOfTrip::where('name', $data[$type_of_trip])->first();
////            $typeOfTripId = 0;
////            if (isset($typeOfTripData)) {
////                $typeOfTripId = $typeOfTripData->id;
////            } else {
////                $dataCreate = TypeOfTrip::create([
////                    'name' => $data[$type_of_trip],
////                    "slug" => $data[$type_of_trip]
////                ]);
////                $typeOfTripId = $dataCreate->id;
////            }
//
//            //////Clinet originData
////            $destinetionDataCheck = DestinationAddress::where('street', $data[$destinetionData[1]])->first();
////            $destinetionDataId = 0;
////            if (isset($destinetionDataCheck)) {
////                $destinetionDataId = $destinetionDataCheck->id;
////            } else {
////                //   dd(count($destinetionData), $data, $data[17]);
////                $desData = DestinationAddress::create([
////                    'name' => $data[$destinetionData[0]],
////                    'street' => $data[$destinetionData[1]],
////                    'suite' => $data[$destinetionData[2]],
////                    'city' => $data[$destinetionData[3]],
////                    'state' => $data[$destinetionData[4]],
////                    'postal' => $data[$destinetionData[5]],
////                    'country' => $data[$destinetionData[6]],
////                    'phone' => $data[$destinetionData[7]],
////
////                ]);
////                $destinetionDataId = $desData->id;
////            }
//
//            //////Clinet destination
////            $originDa = OriginAddress::where('street', $data[$originData[1]])->first();
////            $originDataId = 0;
////            if (isset($originDa)) {
////                $originDataId = $originDa->id;
////            } else {
////                $OriginAddressData = OriginAddress::create([
////                    'name' => $data[$originData[0]],
////                    'street' => $data[$originData[1]],
////                    'suite' => $data[$originData[2]],
////                    'city' => $data[$originData[3]],
////                    'state' => $data[$originData[4]],
////                    'postal' => $data[$originData[5]],
////                    'country' => $data[$originData[6]],
////                    'phone' => $data[$originData[7]]
////
////                ]);
////
////                $originDataId = $OriginAddressData->id;
////            }
//
//            $clients = Clients::create(
//                [
//                    'vendor_id' => null,
//                    ////'car_id' => 2,
//                    'type_id' => 2,
//                    'operator_id' => 1,
//                    'trip_id' => $data[$trip_id],
//                    'fullName' => $data[$name] . ' '.  $data[$surname],
//                    'gender' => $genderType,
//                    'los_id' => $losType,
//                   /// 'phone_number' => $data[$phone_number],
//                    'date_of_service' => date('Y-m-d', strtotime($data[$date_of_service])),
//                    ///'appointment_time' => $data[$appointment_time],
//                    'pick_up' => $data[$pick_up],
//                    'drop_down' => $data[$drop_down],
//                    'request_type' => $requestTypeId, ///seect
//                ///    'status' => $statusId, ///seect
//                    'origin' => $data[$originData[0]] . ' ' . $data[$originData[1]] . ' ' . $data[$originData[2]] . ' ' . $data[$originData[3]],
//                    'origin_phone' => $data[$originData[7]],
//                    ///'origin_id' => $originDataId,
//                    'origin_comment' => $data[$origin_comment],
//                    'destination_phone' => $data[$destinetionData[7]],
//                    "destination" => $data[$destinetionData[0]] . ' ' . $data[$destinetionData[1]] . ' ' . $data[$destinetionData[2]] . ' ' . $data[$destinetionData[3]],
//                   /// "destination_id" => $destinetionDataId,
//                    'destination_comments' => $data[$destination_comments],
//                    'miles' => (int)$data[$miles],
//                    'member_uniqie_identifer' => $data[$member_uniqie_identifer],
//                    'birthday' => $data[$birthday]
//                ]
//            );
//        }
//        return true;
//    }

    public function getMondaysInRange($dateFromString, $dateToString)
    {
        $dateFrom = new \DateTime($dateFromString);
        $dateTo = new \DateTime($dateToString);
        $dates = [];

        if ($dateFrom > $dateTo) {
            return $dates;
        }

        if (1 != $dateFrom->format('N')) {
            $dateFrom->modify('next monday');
        }

        while ($dateFrom <= $dateTo) {
            $dates[] = $dateFrom->format('Y-m-d');
            $dateFrom->modify('+1 week');
        }

        return $dates;
    }

    public function getDate()
    {
        $dateFromString = '2023-02-05';
        $dateToString = '2023-06-20';
        var_dump($this->getMondaysInRange($dateFromString, $dateToString));
    }
}
