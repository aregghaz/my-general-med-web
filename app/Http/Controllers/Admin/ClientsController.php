<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientFieldCollection;
use App\Models\Clients;
use App\Models\ClientTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{

    protected $title = [
        'id',
        'trip_id',
        'fullName',
        'gender',
        'los',
        'date_of_service',
        'pick_up',
        'drop_down',
        'request_type', ///seect
        'status', ///seect
        'origin',
        /// 'origin_id',
        'origin_phone',
        'origin_comment',
        'destination',
        //  'destination_id',
        'destination_phone',
        'destination_comments',
        'miles',
        'member_uniqie_identifer',
        'birthday',
        'weight',

    ];

    public function clientsData(Request $request)
    {
        $allFields = $request->user()->id !== 1 ? $request->user()->fields()->get()->pluck('name')->toArray() : ClientTable::pluck('slug')->toArray();
        $vendorFields = $request->titles ? $request->titles : $allFields;

        $clientData = new ClientFieldCollection($vendorFields);
        $showMore = $request->showMore;
        $clientsData = [];
        $selectedFieldsTitle = [];

        $tripCount = Clients::where(['type_id' => 1])->count();
        $available = Clients::where('type_id', 2)->count();
        $cancelCount = Clients::where('type_id', 4)->count();
        $progressCount = Clients::where('type_id', 5)->count();
        $doneCount = Clients::where('type_id', 6)->count();

        $clients = DB::table('clients')->where('type_id', $request->typeId);
        if ($request->typeId != 2) {
            $clients = $clients->where('type_id', $request->typeId);
        }
        if (isset($request->queryData)) {
            $this->convertQuery($request->queryData, $vendorFields, $clients);
        }

        $clientsDataWith = [];

        for ($i = 0; $i < count($vendorFields); $i++) {
            $selectedFieldsTitle[] = $vendorFields[$i];
            if ($vendorFields[$i] == 'request_type') {
                $clients = $clients->join('request_types', 'clients.request_type', '=', 'request_types.id');
                $clientsData[] = "request_types.name as request_type";
            } else if ($vendorFields[$i] == 'status') {
                $clients = $clients->join('client_statuses', 'clients.status', '=', 'client_statuses.id');
                $clientsData[] = "client_statuses.name as status";
            } else if ($vendorFields[$i] == 'gender') {
                $clients = $clients->join('genders', 'clients.gender', '=', 'genders.id');
                $clientsData[] = "genders.name as gender";
            } else if ($vendorFields[$i] == 'car_id' and ((int)$request->typeId !== 2 and (int)$request->typeId !== 4)) {
                $clients = $clients->join('cars', function ($query) {
                    $query->on('cars.id', '=', 'clients.car_id')->orWhereNull('clients.car_id');;
                });
                $clients = $clients->join('makes', 'makes.id', '=', 'cars.make_id');
                $clientsData[] = "clients.car_id as " . $selectedFieldsTitle[$i];
                $clientsData[] = "makes.name as car_name";
            } else if ($vendorFields[$i] == 'vendor_id' and ((int)$request->typeId !== 2 and (int)$request->typeId !== 4)) {
                $clients = $clients->join('users as u2', 'clients.vendor_id', '=', 'u2.id');
                $clientsData[] = "u2.name as " . $selectedFieldsTitle[$i];
            } else if ($vendorFields[$i] == 'operator_id' and ((int)$request->typeId !== 2 and (int)$request->typeId !== 4)) {
                $clients = $clients->join('users AS u1', 'clients.operator_id', '=', 'u1.id');
                $clientsData[] = "u1.name as " . $selectedFieldsTitle[$i];
            } else if ($vendorFields[$i] !== 'action') {
                $clientsData[] = 'clients.' . $selectedFieldsTitle[$i] . " as " . $selectedFieldsTitle[$i];
            }
        }

        $result = array_diff($allFields, $selectedFieldsTitle);
        $selectedFields = count($clientsData) > 0 ? $clientsData : $clientData;
        array_unshift($selectedFields, 'clients.id as id');
        ///dd( $selectedFields);

        $clients = $clients->select($selectedFields);

        $clients = $clients->take(15 * $showMore)->get();
        // // dd($clients);
        // // dd( $clients->get());
        // if(count($selectedFieldsTitle) > 1){
        //  array_shift($selectedFieldsTitle);
        // }
        ////  $selectedFieldsTitle[] = 'action';
        //   dd($selectedFieldsTitle);
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

}
