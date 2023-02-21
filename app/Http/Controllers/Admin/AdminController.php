<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientFieldCollection;
use App\Http\Resources\StatusTableCollection;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\Escort;
use App\Models\Gender;
use App\Models\Los;
use App\Models\RequestType;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function changeStatus(Request $request, $slug)
    {

        $gender = Gender::count();
        $requestType = RequestType::count();
        $los = Los::count();
        $clientStatus = ClientStatus::count();
        ///$escort = Escort::count();
        switch ($slug) {
            case 1:
                $table = new Gender;
                break;
            case 2:
                $table = new Escort;
                break;
            case 4:
                $table = new RequestType;
                break;
            case 3:
                $table = new Los;
                break;
            case 5:
                $table = new ClientStatus;
                break;
        }
        $table = $table->get();
        return response()->json([
            'table' => new StatusTableCollection($table),
            "gender" => $gender,
            "los" => $los,
            "clientStatus" => $clientStatus,
            "requestType" => $requestType
        ], 200);
    }

    public function getStatusById(Request $request, $id, $table)
    {
        $gender = Gender::count();
        $requestType = RequestType::count();
        $los = Los::count();
        $clientStatus = ClientStatus::count();
        switch ($table) {
            case 1:
                $table = new Gender;
                break;
            case 2:
                $table = new Escort;
                break;
            case 4:
                $table = new RequestType;
                break;
            case 3:
                $table = new Los;
                break;
            case 5:
                $table = new ClientStatus;
                break;
        }
        $table = $table->find($id);
        return response()->json([
            'data' => [
                'id' => $table->id,
                'name' => $table->name,
                'slug' => $table->slug,
            ],
            "gender" => $gender,
            "los" => $los,
            "clientStatus" => $clientStatus,
            "requestType" => $requestType
        ], 200);
    }

    public function createStatus(Request $request, $table)
    {
        switch ($table) {
            case 1:
                $table = new Gender;
                break;
            case 2:
                $table = new Escort;
                break;
            case 4:
                $table = new RequestType;
                break;
            case 3:
                $table = new Los;
                break;
            case 5:
                $table = new ClientStatus;
                break;
        }
        $requestData = json_decode($request->value);
        $table = $table->create([
            'name' => $requestData->name,
            'slug' => $requestData->slug,
        ]);
        if (!$table->save()) {
            return response()->json([
                'success' => '0',
                'type' => 'forbidden',
            ], 403);
        }

        return response()->json([
            "status" => 200
        ], 200);
    }

    public function updateStatus(Request $request, $table, $id)
    {
        switch ($table) {
            case 1:
                $table = new Gender;
                break;
            case 2:
                $table = new Escort;
                break;
            case 4:
                $table = new RequestType;
                break;
            case 3:
                $table = new Los;
                break;
            case 5:
                $table = new ClientStatus;
                break;
        }
        $requestData = json_decode($request->value);
        $table->find($id)->update([
            'name' => $requestData->name,
            'slug' => $requestData->slug,
        ]);
        return response()->json([
            "status" => 200
        ], 200);
    }

    public function updateClient(Request $request, $id)
    {
        Clients::find($id)->update([
            "pick_up" => $request->pick_up,
            "drop_down" => $request->drop_down,
            ///"additionalNote"=>$request->additionalNote,
            "operator_note" => $request->operator_note,
        ]);
        return response()->json([
        ], 200);
    }
}
