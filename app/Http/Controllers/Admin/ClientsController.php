<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientFieldCollection;
use App\Models\Clients;
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
        $allFields  =  $this->title;
        $vendorFields = $request->titles ?$request->titles :  $allFields;

        $clientData = new ClientFieldCollection($vendorFields);
        $showMore = $request->showMore;
        $clientsData = [];
        $selectedFieldsTitle = [];

        $tripCount = Clients::where(['type_id' => 1])->count();
        $available = Clients::where('type_id', 2)->count();

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
            $explodeRelation = explode("_", $vendorFields[$i]);
            //////origin_address reletion cheking and add to title
         if ($vendorFields[$i] == 'request_type') {
                $clients = $clients->join('request_types', 'clients.request_type', '=', 'request_types.id');
                $clientsData[] = "request_types.name as request_type";
                //////status reletion cheking and add to title
            }
            else if ($vendorFields[$i] == 'status') {
                $clients = $clients->join('client_statuses', 'clients.status', '=', 'client_statuses.id');
                $clientsData[] = "client_statuses.name as status";
                //////gender reletion cheking and add to title
            }
            else if ($vendorFields[$i] == 'gender') {
                $clients = $clients->join('genders', 'clients.gender', '=', 'genders.id');
                $clientsData[] = "genders.name as gender";
                //////adding default fields in to select
            }  else if($vendorFields[$i] !== 'action') {
                $clientsData[] =  'clients.' . $selectedFieldsTitle[$i] . " as " . $selectedFieldsTitle[$i];
            }
        }

        $result = array_diff( $allFields, $selectedFieldsTitle);
        $selectedFields = count($clientsData) > 0 ? $clientsData : $clientData;
        array_unshift($selectedFields, 'clients.id as id');
        ///dd( $selectedFields);

        $clients = $clients->select($selectedFields);

        $clients =  $clients->take(15 * $showMore)->get();
        // // dd($clients);
        // // dd( $clients->get());
        // if(count($selectedFieldsTitle) > 1){
        //  array_shift($selectedFieldsTitle);
        // }
        $selectedFieldsTitle[] = 'action';
        //   dd($selectedFieldsTitle);
        return response()->json([
            'clients' => $clients,
            'selectedFields' =>  new ClientFieldCollection($selectedFieldsTitle),
            "titles" => new ClientFieldCollection($result),
            'tripCount' => $tripCount,
            'availableCount' => $available,

        ], 200);
    }

}
