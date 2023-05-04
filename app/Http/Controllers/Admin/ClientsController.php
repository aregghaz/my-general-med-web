<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientFieldCollection;
use App\Http\Resources\SelectAndPriceCollection;
use App\Http\Resources\StatusCollection;
use App\Models\Address;
use App\Models\Artificial;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\ClientTable;
use App\Models\Gender;
use App\Models\Los;
use App\Models\PriceList;
use App\Models\RequestType;
use App\Models\Stairchair;
use App\Models\User;
use App\Models\WaitDuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{

    public function clientsData(Request $request)
    {
        $allFields = $request->user()->id !== 1 ? $request->user()->fields()->get()->pluck('name')->toArray() : ClientTable::pluck('slug')->toArray();
        $vendorFields = $request->titles ? $request->titles : $allFields;

        $clientData = new ClientFieldCollection($vendorFields);
        $showMore = $request->showMore;
        $clientsData = [];
        $selectedFieldsTitle = [];
        $typeId = (int)$request->typeId;
        $queryData = $request->queryData;
        $dateData = $request->date;
        $tripCount = Clients::where(['type_id' => 1]);
        $available = Clients::where('type_id', 2);
        $cancelCount = Clients::where('type_id', 2)->where('vendor_id', '!=', null);
        $progressCount = Clients::where('type_id', 5);
        $doneCount = Clients::where('type_id', 6);


        if ($typeId === 2 || $typeId === 3 || $typeId === 4) {
            /////FIXME ADD START AND END TIME FORM DRIVE
            if (($key = array_search('car_id', $vendorFields)) !== false) {
                array_splice($vendorFields, $key, 1);

            }
            if (($key = array_search('vendor_id', $vendorFields)) !== false) {
                array_splice($vendorFields, $key, 1);

            }
            if ($typeId == 4) {
                $clients = DB::table('clients')->where('type_id', 2)->where('clients.vendor_id', '!=', null);

            } else if ($typeId == 2) {
                $clients = DB::table('clients')->where('type_id', 2);
            }
        } else {
            $clients = DB::table('clients')->where('type_id', $request->typeId);
        }

        if (isset($dateData)) {

            $clients = $clients->where('date_of_service', date('Y-m-d', strtotime($dateData)));
            $tripCount = $tripCount->where('date_of_service', date('Y-m-d', strtotime($dateData)));
            $available = $available->where('date_of_service', date('Y-m-d', strtotime($dateData)));
            $cancelCount = $cancelCount->where('date_of_service', date('Y-m-d', strtotime($dateData)));
            $progressCount = $progressCount->where('date_of_service', date('Y-m-d', strtotime($dateData)));
            $doneCount = $doneCount->where('date_of_service', date('Y-m-d', strtotime($dateData)));
        }
        ///  $clients = DB::table('clients')->where('type_id', $request->typeId);
        if (isset($queryData)) {
            $this->convertQuery($queryData, $vendorFields, $clients);
            $this->convertQuery($queryData, $vendorFields, $tripCount);
            $this->convertQuery($queryData, $vendorFields, $available);
            $this->convertQuery($queryData, $vendorFields, $cancelCount);
            $this->convertQuery($queryData, $vendorFields, $progressCount);
            $this->convertQuery($queryData, $vendorFields, $doneCount);

        }

        $doneCount = $doneCount->count();
        $progressCount = $progressCount->count();
        $cancelCount = $cancelCount->count();
        $tripCount = $tripCount->count();
        $available = $available->count();
//dd($vendorFields);
        $joinCheck = false;
        $joinCheckDrop = false;
        for ($i = 0; $i < count($vendorFields); $i++) {
            $selectedFieldsTitle[] = $vendorFields[$i];
            if ($vendorFields[$i] == 'request_type') {
                $clients = $clients->join('request_types', 'clients.request_type', '=', 'request_types.id');
                $clientsData[] = "request_types.name as request_type";
            } else if ($vendorFields[$i] == 'status') {
                $clients = $clients->join('client_statuses', 'clients.type_id', '=', 'client_statuses.id');
                $clientsData[] = "client_statuses.name as status";
            } else if ($vendorFields[$i] == 'duration_id') {
                $clients = $clients->join('wait_durations', 'clients.duration_id', '=', 'wait_durations.id');
                $clientsData[] = "wait_durations.name as duration_id";
            } else if ($vendorFields[$i] == 'pick_up') {
                if (!$joinCheck) {
                    $clients = $clients->join('addresses as a1', 'clients.id', '=', 'a1.client_id')->where('a1.step', '=', 1);
                    $joinCheck = true;
                }
                $clientsData[] = "a1.pick_up as pick_up";
            } else if ($vendorFields[$i] == 'origin') {
                if (!$joinCheck) {
                    $clients = $clients->join('addresses as a1', 'clients.id', '=', 'a1.client_id')->where('a1.step', '=', 1);
                    $joinCheck = true;
                }
                $clientsData[] = "a1.address as address";
            } else if ($vendorFields[$i] == 'origin_phone') {
                if (!$joinCheck) {
                    $clients = $clients->join('addresses as a1', 'clients.id', '=', 'a1.client_id')->where('a1.step', '=', 1);
                    $joinCheck = true;
                }
                $clientsData[] = "a1.address_phone as origin_phone";
            } else if ($vendorFields[$i] == 'origin_comment') {
                if (!$joinCheck) {
                    $clients = $clients->join('addresses as a1', 'clients.id', '=', 'a1.client_id')->where('a1.step', '=', 1);
                    $joinCheck = true;
                }
                $clientsData[] = "a1.address_comments as origin_comment";
            } else if ($vendorFields[$i] == 'drop_down') {
                if (!$joinCheckDrop) {
                    $clients = $clients->join('addresses as a2', function ($join) {
                        $join->on('clients.id', '=', 'a2.client_id');
                        $join->on('a2.step', '=', 'clients.stops');
                    });
                    $joinCheckDrop = true;
                }
                $clientsData[] = "a2.drop_down as drop_down";
            } else if ($vendorFields[$i] == 'destination') {
                if (!$joinCheckDrop) {
                    $clients = $clients->join('addresses as a2', function ($join) {
                        $join->on('clients.id', '=', 'a2.client_id');
                        $join->on('a2.step', '=', 'clients.stops');
                    });
                    $joinCheckDrop = true;
                }
                $clientsData[] = "a2.address as destination";
            } else if ($vendorFields[$i] == 'destination_phone') {
                if (!$joinCheckDrop) {
                    $clients = $clients->join('addresses as a2', function ($join) {
                        $join->on('clients.id', '=', 'a2.client_id');
                        $join->on('a2.step', '=', 'clients.stops');
                    });
                    $joinCheckDrop = true;
                }
                $clientsData[] = "a2.address_phone as destination_phone";
            } else if ($vendorFields[$i] == 'destination_comments') {
                if (!$joinCheckDrop) {
                    $clients = $clients->join('addresses as a2', function ($join) {
                        $join->on('clients.id', '=', 'a2.client_id');
                        $join->on('a2.step', '=', 'clients.stops');
                    });
                    $joinCheckDrop = true;
                }
                $clientsData[] = "a2.address_comments as destination_comments";
            } else if ($vendorFields[$i] == 'artificial_id') {
                $clients = $clients->join('artificials', 'clients.artificial_id', '=', 'artificials.id');
                $clientsData[] = "artificials.name as artificial";
            } else if ($vendorFields[$i] == 'los_id') {
                $clients = $clients->join('los', 'clients.los_id', '=', 'los.id');
                $clientsData[] = "los.name as los_id";
                //////gender reletion cheking and add to title
            } else if ($vendorFields[$i] == 'gender') {
                $clients = $clients->join('genders', 'clients.gender', '=', 'genders.id');
                $clientsData[] = "genders.name as gender";
            } else if ($vendorFields[$i] == 'car_id') {
                $clients = $clients->leftJoin('cars', function ($query) {
                    $query->on('cars.id', '=', 'clients.car_id')->whereNotNull('clients.car_id');;
                });
                $clients = $clients->leftJoin('makes', 'makes.id', '=', 'cars.make_id');
                $clientsData[] = "clients.car_id as " . $selectedFieldsTitle[$i];
                $clientsData[] = "makes.name as car_name";
            } else if ($vendorFields[$i] == 'vendor_id') {
                $clients = $clients->join('users as u2', 'clients.vendor_id', '=', 'u2.id');
                $clientsData[] = "u2.name as " . $selectedFieldsTitle[$i];
            } else if ($vendorFields[$i] == 'operator_id') {
                $clients = $clients->join('users AS u1', 'clients.operator_id', '=', 'u1.id');
                $clientsData[] = "u1.name as " . $selectedFieldsTitle[$i];
            } else if ($vendorFields[$i] !== 'action') {
                $clientsData[] = 'clients.' . $selectedFieldsTitle[$i] . " as " . $selectedFieldsTitle[$i];
            }
        }

        $result = array_diff($allFields, $selectedFieldsTitle);
        $selectedFields = count($clientsData) > 0 ? $clientsData : $clientData;
        array_unshift($selectedFields, 'clients.id as id');
        $clients = $clients->select($selectedFields)->orderBy('date_of_service', 'asc');
        $clients = $clients->take(15 * $showMore)->get();

        return response()->json([
            'clients' => $clients,
            'selectedFields' => new ClientFieldCollection($selectedFieldsTitle),
            "titles" => new ClientFieldCollection($result),
            'tripCount' => $tripCount,
            'availableCount' => $available,
            'cancelCount' => $cancelCount,
            'progressCount' => $progressCount,
            'doneCount' => $doneCount,

        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        $request_type = RequestType::get();
        ///  $clientStatus = ClientStatus::get();
        $gender = Gender::get();
        $los = Los::get();
        $artificial = Artificial::get();
        $waitDuration = WaitDuration::get();
        $stairchair = Stairchair::get();
        $vendors = User::where('role_id', 2)->get();

        return response()->json([
            'clientType' => $this->clientCreateType(),
            'daysOnWeek' => $this->daysOnWeek(),
            "gender" => new StatusCollection($gender),
            'request_type' => new StatusCollection($request_type),
            "los" => new StatusCollection($los),
            "vendors" => new StatusCollection($vendors),
            'trip_id' => $this->tripType(),
            'artificial' => new StatusCollection($artificial),
            'waitDuration' => new StatusCollection($waitDuration),
            'stairchair' => new StatusCollection($stairchair),
            ///'status' => new StatusCollection($clientStatus),

        ], 200);
    }

    public function getMondaysInRange($dateFromString, $dateToString, $day)
    {
        $dateFrom = new \DateTime($dateFromString);
        $dateTo = new \DateTime($dateToString);
        $dates = [];

        if ($dateFrom > $dateTo) {
            return $dates;
        }

        if (1 != $dateFrom->format('N')) {
            $dateFrom->modify("next $day");
        }

        while ($dateFrom <= $dateTo) {
            $dates[] = $dateFrom->format('Y-m-d');
            $dateFrom->modify('+1 week');
        }

        return $dates;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $requestData
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        /// dd( $request->file('insurance'));
        $requestData = json_decode($request->value);

        if ($request->hasFile('insurance')) {
            $insurance = $request->file('insurance');
            $file_name = time() + Rand(1, 700) . $insurance->getClientOriginalName();
            $insurance->move(
                public_path() . "/uploads/clients/$requestData->member_unique_identifier/",
                $file_name
            );

            $ins['path'] = "/uploads/clients/$requestData->member_unique_identifier/$file_name";
            $ins['exp'] = date('Y-m-d', strtotime($requestData->insurance_exp));
        } else {
            $ins['path'] = null;
            $ins['exp'] = null;
        }
        $userId = $request->user()->id;
        if ((int)$requestData->clientType->id === 2) {
            foreach ($requestData->daysOnWeek as $days) {
                $dataData = $this->getMondaysInRange($requestData->range[0], $requestData->range[1], $days->label);
                foreach ($dataData as $date) {
                    $this->createClient($requestData, $userId, $date, $ins);
                }
            }
        } else {
            $this->createClient($requestData, $userId, $requestData->date_of_service, $ins);
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

    protected function getClientFieldsForCreate($requestData, $userId, $date, $tripType, $ins)
    {

        $client = new Clients();
        if (isset($requestData->vendors)) {
            $client->vendor_id = $requestData->vendors->id;
            $client->type_id = 1;
            $price = 0;
            $priceLists = PriceList::where(['los_id' => $requestData->los->id, 'vendor_id' => $requestData->vendors->id])->get();
            foreach ($priceLists as $priceList) {
                if ($priceList->type == 'base') {
                    $price = $price + $priceList->price;
                } else {
                    $price = $price + (float)$priceList->price * (float)$requestData->miles;
                }
            }
            /// dd($price);
            $client->price = $price;
        } else {
            $client->type_id = 2;
            if (isset($requestData->specialPrice) && $requestData->specialPrice) {
                $client->price = (float)$requestData->price;
            } else {
                $client->price = 0;
            }
        }
        $client->fullName = $requestData->fullName;
        $client->gender = $requestData->gender->id;
        $client->los_id = $requestData->los->id;
        $client->artificial_id = $requestData->artificial->id;
        $client->duration_id = $requestData->waitDuration->id;
        $client->date_of_service = date('Y-m-d', strtotime($date));
        /////FIXME ADD RIGHT PRICE IF VENDOR SELECTED
        $client->request_type = $requestData->request_type->id;
        $client->operator_id = $userId;
        $client->stops = (int)$requestData->count;
        $client->member_uniqie_identifer = $requestData->member_unique_identifier;
        if (isset($requestData->birthday)) {
            $client->birthday = $requestData->birthday;
        }
        $client->miles = (float)$requestData->miles;
        if (isset($requestData->height)) {
            $client->height = $requestData->height;
        }
        if (isset($requestData->weight)) {
            $client->weight = (float)$requestData->weight;
        }


        if (!$client->save()) {
            return false;
        }

        $client->update([
            "trip_id" => "CC-$client->id-$tripType",
            "insurance" => $ins['path'],
            "insurance_exp" => $ins['exp'],
        ]);


        for ($i = 1; $i <= $requestData->stops; $i++) {
            $address = new Address();
            $address->client_id = $client->id;
            $stepAddress = "step_$i";
            $stepComment = "comment_$i";
            $stepPhone = "phone_$i";
            $address->address = $requestData->$stepAddress->address;
            $address->address_id = $requestData->$stepAddress->id;
            $address->step = $i;

            if (isset($requestData->$stepComment)) {
                $address->address_comments = $requestData->$stepComment;
            }
            if (isset($requestData->$stepPhone)) {
                $address->address_phone = $requestData->$stepPhone;
            }

            if ($i === 1) {
                $stepTimePickUp = "time_$i";
                $address->pick_up = $requestData->$stepTimePickUp;
            } else if ($i === $requestData->count) {
                $stepTimeDropDown = "drop_$i";
                $address->drop_down = $requestData->$stepTimeDropDown;
            } else {
                $stepTimePickUp = "time_$i";
                $address->pick_up = $requestData->$stepTimePickUp;
                $stepTimeDropDown = "drop_$i";
                $address->drop_down = $requestData->$stepTimeDropDown;
            };

            $address->save();
        }
        $this->createAction($userId, $client->id, 7, 1);
        return true;
    }

    protected function createClient($requestData, $userId, $date, $ins)
    {

        $tripType = $requestData->trip_id;
        if ((int)$tripType->id === 3) {

            foreach (['A', 'B'] as $value) {
                if ($value === 'A') {
                    $this->getClientFieldsForCreate($requestData, $userId, $date, $value, $ins);
                } else {
                    $this->getClientFieldsForCreate($requestData, $userId, $date, $value, $ins);

                }
            }
        } else {
            $this->getClientFieldsForCreate($requestData, $userId, $date, $tripType->label, $ins);
        }
        return true;
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Clients $clients
     * @return \Illuminate\Http\JsonResponse>json()
     */
    public function show(Clients $clients, $id)
    {
        $request_type = RequestType::get();
        $clientStatus = ClientStatus::get();
        $gender = Gender::get();
        $los = Los::get();
        $artificial = Artificial::get();
        $waitDuration = WaitDuration::get();
        $vendors = User::where('role_id', 2)->get();
        $stairchair = Stairchair::get();
        $client = Clients::with([
            'waiteDuration',
            'artificial',
            'genderType',
            'address',
            'clientStatus',
            'requestType'
        ])->find($id);

        $clientdata = $this->convertSingleData($client);

        return response()->json([
            'data' => $clientdata,
            ///   'escortType'=> new StatusCollection($escort),
            "gender" => new StatusCollection($gender),
            'request_type' => new StatusCollection($request_type),
            'los' => new StatusCollection($los),
            ///  "type_of_trip" => new StatusCollection($typeOfTrip),
            'status' => new StatusCollection($clientStatus),
            "vendors" => new StatusCollection($vendors),
            "stairchair" => new StatusCollection($stairchair),
            'artificial_id' => new StatusCollection($artificial),
            'duration_id' => new StatusCollection($waitDuration),
        ], 200);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Clients $clients
     * @return \Illuminate\Http\Response
     */
    public function edit(Clients $clients)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $requestData
     * @param \App\Models\Clients $clients
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {

        $userId = $request->user()->id;
        $requestData = json_decode($request->value);

        $client = Clients::find($id);
        $client->fullName = $requestData->fullName;
        $client->gender = $requestData->gender->id;
        $client->los_id = $requestData->los->id;
        $client->artificial_id = $requestData->artificial_id->id;
        $client->duration_id = $requestData->duration_id->id;
        $client->date_of_service = date('Y-m-d', strtotime($requestData->date_of_service));
        ///  $client->price = (int)$requestData->price + (int)$requestData->duration_id->value + (int)$requestData->artificial_id->value;
        $client->request_type = $requestData->request_type->id;
        $client->operator_id = $userId;
        $client->stops = $requestData->count;
        $client->member_uniqie_identifer = $requestData->member_uniqie_identifer;
        if (isset($requestData->birthday)) {
            $client->birthday = $requestData->birthday;
        }
        $client->miles = (float)$requestData->miles;
        if (isset($requestData->height)) {
            $client->height = $requestData->height;
        }
        if (isset($requestData->weight)) {
            $client->weight = (float)$requestData->weight;
        }
        if (isset($requestData->specialPrice) && $requestData->specialPrice) {
            $client->price = (float)$requestData->price;
        } else if (isset($requestData->vendors)) {
            $price = 0;
            $priceLists = PriceList::where(['los_id' => $requestData->los->id, 'vendor_id' => $requestData->vendors->id])->get();

            foreach ($priceLists as $priceList) {
                if ($priceList->type == 'base') {
                    $price = $price + $priceList->price;
                } else {
                    ///dd($price+$priceList->price * $requestData->miles);
                    $price = $price + ($priceList->price * $requestData->miles);
                }
            }
            //dd($price);
            $client->price = $price;
        }
        if ($request->hasFile('insurance')) {
            $insurance = $request->file('insurance');
            $file_name = time() + Rand(1, 700) . $insurance->getClientOriginalName();
            $insurance->move(
                public_path() . "/uploads/clients/$requestData->member_uniqie_identifer/",
                $file_name
            );

            $this->updateAll($requestData->member_uniqie_identifer, "/uploads/clients/$requestData->member_uniqie_identifer/$file_name", date('Y-m-d', strtotime($requestData->insurance_exp)));
        }
        $client->update();
        /// Address::where('client_id', $id)->delete();
        for ($i = 1; $i <= count($requestData->stops); $i++) {
            $stepAddress = "step_$i";
            $stepComment = "comment_$i";
            $stepPhone = "phone_$i";

            if (gettype($requestData->$stepAddress) == 'string') {
                $address = Address::where(['client_id' => $id, 'step' => $i])->first();
                if (isset($requestData->$stepComment)) {
                    $address->address_comments = $requestData->$stepComment;
                }
                if (isset($requestData->$stepPhone)) {
                    $address->address_phone = $requestData->$stepPhone;
                }
                if ($i === 1) {
                    $stepTimePickUp = "time_$i";
                    $address->pick_up = $requestData->$stepTimePickUp;
                } else if ($i === $requestData->count) {
                    $stepTimeDropDown = "drop_$i";
                    $address->drop_down = $requestData->$stepTimeDropDown;
                } else {
                    $stepTimePickUp = "time_$i";
                    $address->pick_up = $requestData->$stepTimePickUp;
                    $stepTimeDropDown = "drop_$i";
                    $address->drop_down = $requestData->$stepTimeDropDown;
                };
                $address->update();
            } else {
                Address::where(['client_id' => $id, 'step' => $i])->delete();
                $address = new Address();
                $address->client_id = $client->id;
                $address->address = $requestData->$stepAddress->address;
                $address->address_id = $requestData->$stepAddress->id;
                $address->step = $i;
                if (isset($requestData->$stepComment)) {
                    $address->address_comments = $requestData->$stepComment;
                }
                if (isset($requestData->$stepPhone)) {
                    $address->address_phone = $requestData->$stepPhone;
                }
                if ($i === 1) {
                    $stepTimePickUp = "time_$i";
                    $address->pick_up = $requestData->$stepTimePickUp;
                } else if ($i === $requestData->count) {
                    $stepTimeDropDown = "drop_$i";
                    $address->drop_down = $requestData->$stepTimeDropDown;
                } else {
                    $stepTimePickUp = "time_$i";
                    $address->pick_up = $requestData->$stepTimePickUp;
                    $stepTimeDropDown = "drop_$i";
                    $address->drop_down = $requestData->$stepTimeDropDown;
                };

                $address->save();
            }

        }
        $this->createAction($userId, $id, 9, 1);
        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        );

    }

    public function updateAll($insuranceId, $path, $date)
    {
        $clinets = Clients::where('member_uniqie_identifer', $insuranceId)->update([
            'insurance_exp' => $date,
            'insurance' => $path,
        ]);
        return true;
    }
}
