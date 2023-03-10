<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatusTableCollection;
use App\Models\Artificial;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\Escort;
use App\Models\Gender;
use App\Models\Los;
use App\Models\Reason;
use App\Models\RequestType;
use App\Models\WaitDuration;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function changeStatus(Request $request, $slug)
    {

        $gender = Gender::count();
        $requestType = RequestType::count();
        $los = Los::count();
        $clientStatus = ClientStatus::count();
        $reasons = Reason::count();
        $waitDuration = WaitDuration::count();
        $artificial = Artificial::count();
        ///$escort = Escort::count();
        $table = $this->getTable($slug);

        $table = $table->orderBy('name', 'asc')->get();
        return response()->json([
            'table' => new StatusTableCollection($table),
            "gender" => $gender,
            "los" => $los,
            "clientStatus" => $clientStatus,
            "requestType" => $requestType,
            "reasons" => $reasons,
            "waitDuration" => $waitDuration,
            "artificial" => $artificial
        ], 200);
    }

    public function getStatusById(Request $request, $id, $table)
    {
        $gender = Gender::count();
        $requestType = RequestType::count();
        $los = Los::count();
        $clientStatus = ClientStatus::count();
        $reasons = Reason::count();
        $waitDuration = WaitDuration::count();
        $artificial = Artificial::count();
        ///$escort = Escort::count();
        $table = $this->getTable($table);
        $table = $table->find($id);
        return response()->json([
            'data' => [
                'id' => $table->id,
                'name' => $table->name,
                'slug' => $table->slug,
            ],
            "gender" => $gender,
            "los" => $los,
            "reasons" => $reasons,
            "clientStatus" => $clientStatus,
            "requestType" => $requestType,
            "waitDuration" => $waitDuration,
            "artificial" => $artificial
        ], 200);
    }


    public function createStatus(Request $request, $tableId)
    {
        $table = $this->getTable($tableId);
        $requestData = json_decode($request->value);
        if($tableId == 7 || $tableId == 8){
            $table = $table->create([
                'name' => $requestData->name,
                'slug' => $requestData->slug,
                'price' => $requestData->price,
            ]);
        }else{
            $table = $table->create([
                'name' => $requestData->name,
                'slug' => $requestData->slug,
            ]);
        }
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

    public function updateStatus(Request $request, $tableId, $id)
    {
        $table = $this->getTable($tableId);
        $requestData = json_decode($request->value);

        if($tableId == 7 || $tableId == 8){
            $table->find($id)->update([
                'name' => $requestData->name,
                'slug' => $requestData->slug,
                'price' => $requestData->price,
            ]);
        }else{
            $table->find($id)->update([
                'name' => $requestData->name,
                'slug' => $requestData->slug,
            ]);
        }

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
            "success" => 1
        ], 200);
    }

    /**
     * @param $tableId
     * @return Artificial|ClientStatus|Escort|Gender|Los|Reason|RequestType|WaitDuration
     */
    public function getTable($tableId)
    {
        switch ($tableId) {
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
            case 7:
                $table = new WaitDuration;
                break;
            case 8:
                $table = new Artificial;
                break;
            case 6:
                $table = new Reason;
                break;
        }
        return $table;
    }
}
