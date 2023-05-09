<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatusCollection;
use App\Http\Resources\StatusTableCollection;
use App\Models\Artificial;
use App\Models\Clients;
use App\Models\ClientStatus;
use App\Models\Escort;
use App\Models\Gender;
use App\Models\Los;
use App\Models\Reason;
use App\Models\RequestType;
use App\Models\Service;
use App\Models\Stairchair;
use App\Models\WaitDuration;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function changeStatus(Request $request, $slug)
    {

        $counts = $this->getCount();
        ///$escort = Escort::count();
        $table = $this->getTable($slug);

        $table = $table->orderBy('name', 'asc')->get();
        return response()->json([
            'table' => new StatusTableCollection($table),
            'counts' => $counts
        ], 200);
    }


    protected function getCount()
    {
        $gender = Gender::count();
        $requestType = RequestType::count();
        $los = Los::count();
        $clientStatus = ClientStatus::count();
        $reasons = Reason::count();
        $waitDuration = WaitDuration::count();
        $artificial = Artificial::count();
        $services = Service::count();
        $stairchair = Stairchair::count();
        return [
            "gender" => $gender,
            "los" => $los,
            "clientStatus" => $clientStatus,
            "requestType" => $requestType,
            "reasons" => $reasons,
            "waitDuration" => $waitDuration,
            "artificial" => $artificial,
            'services' => $services,
            'stairchair' => $stairchair,
        ];
    }


    public function createNewStatus()
    {
        $services = Service::get();
        return [
            'services' => new StatusCollection($services),
        ];
    }

    public function getStatusById(Request $request, $id, $tableId)
    {
        $table = $this->getTable($tableId);
        $table = $table->find($id);
        if ((int)$tableId === 3) {
            $services = Service::get();
            $table = $table->with('services')->find($id);
            if (isset($table->services)) {
                $servicesGet = $table->services;
                $servicesData = [];
                foreach ($servicesGet as $item) {
                    $servicesData[] = [
                        'id' => $item->id,
                        'label' => $item->name,
                        'name' => $item->name,
                        "value" => $item->name,
                    ];
                }
            }
            return response()->json([
                'data' => [
                    'id' => $table->id,
                    'name' => $table->name,
                    'slug' => $table->slug,
                    'services' => $servicesData
                ],
                'services' => new StatusCollection($services),
            ], 200);
        } else {
            $table = $table->find($id);
            return response()->json([
                'data' => [
                    'id' => $table->id,
                    'name' => $table->name,
                    'slug' => $table->slug,
                ],
            ], 200);
        }

    }


    public function createStatus(Request $request, $tableId)
    {
        $table = $this->getTable($tableId);
        $requestData = json_decode($request->value);


        if ((int)$tableId === 3) {
            $table = $table->create([
                'name' => $requestData->name,
                'slug' => $requestData->name,
            ]);
            /// dd($requestData->services);
            $idCats = array_column($requestData->services, 'id');
            $table->services()->attach($idCats);
        } else {
            $table = $table->create([
                'name' => $requestData->name,
                'slug' => $requestData->name,
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

        if ((int)$tableId === 3) {
            $table = $table->find($id);
            $idCats = array_column($requestData->services, 'id');
            $table->services()->sync($idCats);

            $table->update([
                'name' => $requestData->name,
                'slug' => $requestData->name,
            ]);

        } else {
            $table->find($id)->update([
                'name' => $requestData->name,
                'slug' => $requestData->name,
            ]);
        }

        return response()->json([
            "status" => 200
        ], 200);
    }

    public function updateClient(Request $request, $id)
    {
        Clients::find($id)->update([
            ///"additionalNote"=>$request->additionalNote,
            "operator_note" => $request->operator_note,
        ]);
        return response()->json([
            "success" => 1
        ], 200);
    }


    public function delete($tableId, $id)
    {
        $table = $this->getTable($tableId);
        $table->find($id)->delete();
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
                $table = new RequestType;
                break;
            case 3:
                $table = new Los;
                break;
            case 4:
                $table = new ClientStatus;
                break;
            case 5:
                $table = new Reason;
                break;
            case 6:
                $table = new Artificial;
                break;
            case 7:
                $table = new WaitDuration;
                break;
            case 8:
                $table = new Service;
                break;
            case 9:
                $table = new Stairchair;
                break;
        }
        return $table;
    }
}
