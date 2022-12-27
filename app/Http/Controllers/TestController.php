<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestType;
use App\Models\ClientStatus;
use App\Models\TypeOfTrip;
use App\Models\Escort;
use App\Models\OriginAddress;
use App\Models\DestinationAddress;
use App\Models\Clients;
use App\Models\Gender;

class TestController extends Controller
{
  public function index(Request $request)
  {
    /* open this for local file testing purposes only*/



    /// DB::beginTransaction();


    $path = $request->file('file');
    $csv_data = file_get_contents($path);
    /// $data = \Excel::load($path)->get();
    $rows = str_getcsv($csv_data, "\n");

    $result = array();
    foreach ($rows as $k => $row) {
      if ($k > 0) {

        $result[$k - 1] = str_getcsv($rows[$k], ',');
      }
    }
    foreach ($result as $data) {
      // $data = explode(",", $data[0]);
      $trip_id = 0;
      $name = 1;
      $surname = 2;
      $gender = 3;
      $los = 4;
      $phone_number = 5;
      $date_of_service = 6;
      $appointment_time = 7;
      $pick_up = 8;
      $drop_down = 8;
      $request_type = 9;
      $status = 10;
      $originData =  [11, 12, 13, 14, 15, 16, 17, 18];
      $destinetionData = [20, 21, 22, 23, 24, 25, 26, 27];
      $origin_comment = 19;
      $destination_comments = 28;
      $escortType = 29;
      $type_of_trip = 30;
      $miles = 31;
      $member_uniqie_identifer = 32;
      $birthday = 33;

      //////Request Type
      $requestTypeId = 0;
      $checkRequestType = RequestType::where('name', $data[$request_type])->first();
      if (isset($checkRequestType)) {
        $requestTypeId = $checkRequestType->id;
      } else {
        $dataCreateRequest = RequestType::create([
          'name' => $data[$request_type],
          "slug" => $data[$request_type]
        ]);
        $requestTypeId = $dataCreateRequest->id;
      }

      //////Clinet Status
      $checkStatus = ClientStatus::where('name', $data[$status])->first();
      $statusId = 0;
      if (isset($checkStatus)) {
        $statusId = $checkStatus->id;
      } else {
        $dataCreate = ClientStatus::create([
          'name' => $data[$status],
          "slug" => $data[$status]
        ]);
        $statusId = $dataCreate->id;
      }

      //////Clinet Status
      $checkStatus = ClientStatus::where('name', $data[$status])->first();
      $statusId = 0;
      if (isset($checkStatus)) {
        $statusId = $checkStatus->id;
      } else {
        $dataCreate = ClientStatus::create([
          'name' => $data[$status],
          "slug" => $data[$status]
        ]);
        $statusId = $dataCreate->id;
      }

      //////Clinet gender
      $genderData = Gender::where('name', $data[$gender])->first();
      $genderType = 0;
      if (isset($genderData)) {
        $genderType = $genderData->id;
      } else {
        $dataCreate = Gender::create([
          'name' => $data[$gender],
          "slug" => $data[$gender]
        ]);
        $genderType = $dataCreate->id;
      }

      //////Clinet escortType
      $escortTypeData = Escort::where('name', (int)$data[$escortType]  ? 'yes' :"no")->first();
      $escortTypeId = 0;
      if (isset($escortTypeData)) {
        $escortTypeId = $escortTypeData->id;
      } else {
        $dataCreate = Escort::create([
          'name' => (int)$data[$escortType] ? 'yes' :"no",
          "slug" => (int)$data[$escortType]  ? 'yes' :"no"
        ]);
        $escortTypeId = $dataCreate->id;
      }
      //   dd($data);
      //////Clinet type_of_trip
      $typeOfTripData = TypeOfTrip::where('name', $data[$type_of_trip])->first();
      $typeOfTripId = 0;
      if (isset($typeOfTripData)) {
        $typeOfTripId = $typeOfTripData->id;
      } else {
        $dataCreate = TypeOfTrip::create([
          'name' => $data[$type_of_trip],
          "slug" => $data[$type_of_trip]
        ]);
        $typeOfTripId = $dataCreate->id;
      }

      //////Clinet originData
      $destinetionDataCheck = DestinationAddress::where('street', $data[$destinetionData[1]])->first();
      $destinetionDataId = 0;
      if (isset($destinetionDataCheck)) {
        $destinetionDataId = $destinetionDataCheck->id;
      } else {
        //   dd(count($destinetionData), $data, $data[17]);
        $desData = DestinationAddress::create([
          'name' => $data[$destinetionData[0]],
          'street' => $data[$destinetionData[1]],
          'suite' => $data[$destinetionData[2]],
          'city' => $data[$destinetionData[3]],
          'state' => $data[$destinetionData[4]],
          'postal' => $data[$destinetionData[5]],
          'country' => $data[$destinetionData[6]],
          'phone' => $data[$destinetionData[7]],

        ]);
        $destinetionDataId = $desData->id;
      }

      //////Clinet destination
      $originDa = OriginAddress::where('street', $data[$originData[1]])->first();
      $originDataId = 0;
      if (isset($originDa)) {
        $originDataId = $originDa->id;
      } else {
        $OriginAddressData = OriginAddress::create([
          'name' => $data[$originData[0]],
          'street' => $data[$originData[1]],
          'suite' => $data[$originData[2]],
          'city' => $data[$originData[3]],
          'state' => $data[$originData[4]],
          'postal' => $data[$originData[5]],
          'country' => $data[$originData[6]],
          'phone' => $data[$originData[7]]

        ]);

        $originDataId = $OriginAddressData->id;
      }
      // dd(111111);
      ///    dd( (int)rand(1,4));
      // dd(  ['client_id' => (int)rand(1,4)]);
      $clients = Clients::create(
        [
          'vendor_id' => 1,
          'car_id' => 2,
          'type_id' => rand(1,4),
          'trip_id' => $data[$trip_id],
          'name' => $data[$name],
          'surname' => $data[$surname],
          'gender' => $genderType,
          'los' => $data[$los],
          'phone_number' => $data[$phone_number],
          'date_of_service' => $data[$date_of_service],
          'appointment_time' => $data[$appointment_time],
          'pick_up' => $data[$pick_up],
          'drop_down' => $data[$drop_down],
          'request_type' => $requestTypeId, ///seect
          'status' => $statusId, ///seect
          'origin_id' => $originDataId,
          "destination_id" => $destinetionDataId,
          'escortType' => $escortTypeId, //select
          'type_of_trip' => $typeOfTripId, //select
          'origin_comment' => $data[$origin_comment],
          'destination_comments' => $data[$destination_comments],
          'miles' => (int)$data[$miles],
          'member_uniqie_identifer' => $data[$member_uniqie_identifer],
          'birthday' => $data[$birthday]
        ]
      );
    }
    return true;
  }
}
