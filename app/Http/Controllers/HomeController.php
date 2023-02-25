<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarsSelectCollection;
use App\Http\Resources\ClientCollection;
use App\Http\Resources\ClientFieldCollection;
use App\Models\Cars;
use App\Models\Clients;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{


    protected $title = [
        'id',
        'trip_id',
        'name',
        'surname',
        'gender',
        'los_id',
        'phone_number',
        'date_of_service',
        'appointment_time',
        'pick_up',
        'drop_down',
        'request_type', ///seect
        'status', ///seect
        'origin_name',
        'origin_street',
        'origin_suite',
        'origin_city',
        'origin_state',
        'origin_postal',
        'origin_country',
        'origin_phone',
        'origin_comment',
        'destination_name',
        'destination_street',
        'destination_suite',
        'destination_city',
        'destination_state',
        'destination_postal',
        'destination_country',
        'destination_phone',
        'destination_comments',
        'escortType', //select
        'type_of_trip', //select
        'miles',
        'member_uniqie_identifer',
        'birthday'
    ];

    public function clientData(Request $request)
    {
        $allFields = $request->user()->fields()->get()->pluck('name')->toArray();
        $vendorFields = $request->titles ? $request->titles : $allFields;

        // dd($vendorFields);
        $clientData = new ClientFieldCollection($vendorFields);
        $showMore = $request->showMore;
        $clientsData = [];
        $typeId = (int)$request->typeId;
        $selectedFieldsTitle = [];
        $queryData = $request->queryData;
        $vendorId = $request->user()->vendor_id;
        $tripCount = Clients::where(['vendor_id' => $vendorId, 'type_id' => 1]);
        $available = Clients::where('type_id', 2)->where('vendor_id', '<>', $vendorId)->OrWhereNull('vendor_id');
        $cancelCount = Clients::where(['type_id' => 2, 'vendor_id' => $vendorId]);
        $progressCount = Clients::where('type_id', 5);
        $doneCount = Clients::where('type_id', 6);

        if ($typeId === 2 || $typeId === 3 || $typeId === 4) {
            if (($key = array_search('car_id', $vendorFields)) !== false) {
                array_splice($vendorFields, $key, 1);

            }
            if ($typeId == 4) {
                $clients = DB::table('clients')->where(['type_id' => 2, 'clients.vendor_id' => $vendorId]);

            } else if ($typeId == 2) {
                $clients = DB::table('clients')->where('type_id', 2)->where('vendor_id', '<>', $vendorId)->orWhereNull('vendor_id');
            }
        } else {
            $clients = DB::table('clients')->where(['type_id' => $request->typeId, 'clients.vendor_id' => $vendorId]);
        }

        if (isset($queryData)) {
            $this->convertQuery($queryData, $vendorFields, $clients);

            $tripCount = $tripCount->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
            $available = $available->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
            $cancelCount = $cancelCount->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
            $progressCount = $progressCount->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
            $doneCount = $doneCount->where(function ($query) use ($queryData) {
                $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                    ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%');
            });
        }

        $doneCount = $doneCount->count();
        $progressCount = $progressCount->count();
        $cancelCount = $cancelCount->count();
        $tripCount = $tripCount->count();
        $available = $available->count();

        for ($i = 0; $i < count($vendorFields); $i++) {
            $selectedFieldsTitle[] = $vendorFields[$i];
            if ($vendorFields[$i] == 'request_type') {
                $clients = $clients->join('request_types', 'clients.request_type', '=', 'request_types.id');
                $clientsData[] = "request_types.name as request_type";
                //////status reletion cheking and add to title
            } else if ($vendorFields[$i] == 'los_id') {
                $clients = $clients->join('los', 'clients.los_id', '=', 'los.id');
                $clientsData[] = "los.name as los_id";
                //////gender reletion cheking and add to title
            } else if ($vendorFields[$i] == 'gender') {
                $clients = $clients->join('genders', 'clients.gender', '=', 'genders.id');
                $clientsData[] = "genders.name as gender";
                //////adding default fields in to select
            } else if ($vendorFields[$i] == 'car_id' and ($typeId !== 2)) {
                $clients = $clients->leftJoin('cars', function ($query) {
                    $query->on('cars.id', '=', 'clients.car_id')->orWhereNull('clients.car_id');;
                });
                $clients = $clients->leftJoin('makes', 'makes.id', '=', 'cars.make_id');
                $clientsData[] = "clients.car_id as " . $selectedFieldsTitle[$i];
                $clientsData[] = "makes.name as car_name";
            } else if ($vendorFields[$i] !== 'action') {
                $clientsData[] = 'clients.' . $selectedFieldsTitle[$i] . " as " . $selectedFieldsTitle[$i];
            }
        }
        $result = array_diff($allFields, $selectedFieldsTitle);

        $selectedFields = count($clientsData) > 0 ? $clientsData : $clientData;

        array_unshift($selectedFields, 'clients.id as id');
        $clients = $clients->select($selectedFields);

        $clients = $clients->take(15 * $showMore)->get();
        /// dd($selectedFields);
        // if(count($selectedFieldsTitle) > 1){
        //  array_shift($selectedFieldsTitle);
        // }

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

    public function show($id)
    {
        $client = Clients::with([
            /// 'origin',
            /// 'destination',
            'clientStatus',
            'requestType'
        ])->find($id);
        $status = $this->clientTypes();
        return response()->json([
            'client' => $this->convertSingleDataForInfo($client),
            'status' => $status,
        ], 200);
    }

    public function index(Request $request)
    {
        $vendorID = Auth::user()->vendor_id;
        $showMore = $request->showmore;


        if (isset($request->querySearch)) {


            $clients = Clients::where('vendor_id', $vendorID)->where('client_id', 'LIKE', '%' . $request->querySearch . '%')->orWhere('driver_id', 'LIKE', '%' . $request->querySearch . '%')->paginate(20);
        } else {
            $clients = Clients::with([
                'genderType',
                'clientStatus',
                'requestType'
            ])->select(
                "client_id",
                'car_id',
                'vendor_id',
                'trip_id',
                'name',
                'surname',
                'gender',
                'los',
                'phone_number',
                'date_of_service',
                'appointment_time',
                'pick_up',
                'drop_down',
                'request_type', ///seect
                'status', ///seect
                'origin',
                'origin_id',
                'origin_phone',
                "destination_id",
                "destination_phone",
                "destination",
                'origin_comment',
                'destination_comments',
                'escortType', //select
                'type_of_trip', //select
                'miles',
                'member_uniqie_identifer',
                'birthday'
            )->take(15)->get();
        }


        return response()->json([
            'clients' => new ClientCollection($clients),
            "titles" => new ClientFieldCollection($this->title)
            //    "count"=> (Clients::count() / 20)
        ], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function changeClientType(Request $request)
    {
        $ids = $request->ids;
        $vendorId = $request->user()->vendor_id;
        if ((int)$request->status === 2) {
            Clients::whereIn('id', $ids)->update(['type_id' => $request->status, 'vendor_id' => null, "car_id" => null]);

        } else if ((int)$request->status === 4) {
            Clients::whereIn('id', $ids)->update(['type_id' => 2, "car_id" => null]);
        } else if ((int)$request->status === 1) {
            Clients::whereIn('id', $ids)->update(['type_id' => 1, 'vendor_id' => $vendorId, "car_id" => null]);
        } else {
            Clients::whereIn('id', $ids)->update(['type_id' => $request->status, 'vendor_id' => $vendorId]);
        }
        foreach ($ids as $id) {
            $this->createAction($vendorId, $id, (int)$request->status, 1);
        }
        return response()->json([
            'status' => 200
        ], 200);
    }


    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function carDataForSelect(Request $request)
    {
        $vendorId = $request->user()->vendor_id;
        $cars = Cars::with('driver')->where('vendor_id', $vendorId)->get();

        return response()->json([
            "cars" => new CarsSelectCollection($cars)
        ], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function assignCarDriver(Request $request): JsonResponse
    {
        $clientsIds = $request->ids;
        $carId = $request->carId;
        $clients = Clients::whereIn('id', $clientsIds)->update(["car_id" => $carId]);
        if ($clients) {
            foreach ($clientsIds as $id) {
                $this->createAction($request->user()->vendor_id, $id, 10, 1);

            }
            return response()->json([
                'success' => 1,
            ], 200);
        } else {
            return response()->json(
                [
                    'success' => 0,
                    //'type' => 'validation_filed',
                    'error' => 'something wrong with your reqeuest',
                ],
                200
            );
        }
    }

    public function getClientDataDriver(Request $request)
    {
        $vendorId = $request->user()->vendor_id;
        $carId = $request->user()->driver->car_id;
        $clients = Clients::where(['vendor_id' => $vendorId, 'car_id' => $carId])->get();
        return response()->json([
            'clients' => $clients,
            'success' => 1,
        ], 200);
    }
}
