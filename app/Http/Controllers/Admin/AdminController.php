<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientFieldCollection;
use App\Http\Resources\StatusTableCollection;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\Escort;
use App\Models\Los;
use App\Models\RequestType;
use App\Models\TypeOfTrip;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function changeStatus(Request $request, $slug)
    {

        switch ($slug) {
            case "request_type":
                $table = new RequestType;
                break;
            case "status":
                $table = new ClientStatus;
                break;
            case "escortType":
                $table = new Escort;
                break;
            case "type_of_trip":
                $table = new TypeOfTrip;
                break;
            case "los":
                $table = new Los;
                break;
            default:
                $table = new Escort;
        }
        $table = $table->get();
        return response()->json([
            'table' => new StatusTableCollection($table),
            "count" => count($table)
        ], 200);
    }

    public function getStatusById(Request $request, $table, $id)
    {

        switch ($table) {
            case "request_type":
                $table = new RequestType;
                break;
            case "status":
                $table = new ClientStatus;
                break;
            case "escortType":
                $table = new Escort;
                break;
            case "type_of_trip":
                $table = new TypeOfTrip;
                break;
            case "los":
                $table = new Los;
                break;
            default:
                $table = new Escort;
        }
        $table = $table->find($id);
        return response()->json([
            'table' => new ClientFieldCollection($table),
            "count" => count($table)
        ], 200);
    }

    public function createStatus(Request $request, $table)
    {
        switch ($table) {
            case "request_type":
                $table = new RequestType;
                break;
            case "status":
                $table = new ClientStatus;
                break;
            case "escortType":
                $table = new Escort;
                break;
            case "type_of_trip":
                $table = new TypeOfTrip;
                break;
            case "los":
                $table = new Los;
                break;
            default:
                $table = new Escort;
        }
        $table = $table->create([
            'label' => $request->value->label,
            'slug' => $request->value->slug,
            'value' => $request->value->value,
        ]);
        if (!$table->save()) {
            return response()->json([
                'success' => '0',
                'type' => 'forbidden',
            ], 403);
        }

        return response()->json([
            'table' => new ClientFieldCollection($table),
            "count" => count($table)
        ], 200);
    }
    public function updateClient(Request $request,$id){
        Clients::find($id)->update([
            "pick_up" => $request->pick_up,
            "drop_down"=>$request->drop_down,
            ///"additionalNote"=>$request->additionalNote,
            "operator_note"=>$request->operator_note,
        ]);
        return response()->json([
        ], 200);
    }
}
