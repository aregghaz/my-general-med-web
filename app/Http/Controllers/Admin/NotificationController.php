<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Vendor\CarsController;
use App\Http\Controllers\Vendor\VendorUsersController;
use App\Http\Resources\NotificationCollection;
use App\Models\Cars;
use App\Models\Clients;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $typeId, $showMore)
    {

        $roleId = $request->user()->role;
        $driverCount = Notification::where('model', 1)->count();
        $carCount = Notification::where('model', 2)->count();
        $patientCount = Notification::where('model', 3)->count();
        $tripsCount = Notification::where('model', 5)->count();
//dd($typeId);
        $notification = Notification::where('model', (int)$typeId)->with('getAction');
        /////FIXME OPTIMAZE THIS PART
        $notification = $notification->with('getCars', 'getDriver', 'getTrip');
        $notification = $notification->orderBy('created_at', "desc")
            ->take(25 * $showMore)->get();
        return response()->json(
            [
                'data' => new NotificationCollection($notification),
                'driverCount' => $driverCount,
                'carCount' => $carCount,
                'patientCount' => $patientCount,
                'tripsCount' => $tripsCount,
                'count' => Notification::where('new_admin', 1)->count(),
            ],
            200
        );
    }

    public function vendorNotification(Request $request, $showMore)
    {

        $vendor = $request->user()->vendor_id;
        $ids = User::where('vendor_id', $vendor)->where(
            'id',
            '!=',
            $vendor
        )->select('id')->get()->toArray();

        $carIds = Cars::where('vendor_id', $vendor)->select('id')->get()->toArray();


        $notification = Notification::with('getAction')->where(function ($query) use ($ids) {
            $query->whereIn('value_id', $ids)->where('model', 'driver');
        })->orWhere(function ($query) use ($carIds) {
            $query->whereIn('value_id', $carIds)->where('model', 'car');
        })
            //   ->orderBy('new_vendor', "desc")
            ->orderBy('created_at', "desc")
            ->take(25 * $showMore)->get();;

        return response()->json(
            [
                'data' => new NotificationCollection($notification),
                'count' => $notification->where('new_vendor', 1)->count(),
            ],
            200
        );
    }

    public function getCount()
    {
        $notification = Notification::where('new_admin', 1)->count();
        return response()->json(
            [
                'data' => $notification,
            ],
            200
        );
    }

    public function getInfo(Request $request, $id, $role)
    {
        $notification = Notification::find($id);

        switch ($notification->model) {
            case 'driver':
                $dataNotif = VendorUsersController::show($notification->value_id);
                break;
            case 'car':
                $car = new CarsController();
                $dataNotif = $car->show($notification->value_id);
                break;
            case 'client':
                $dataNotif = Clients::where('member_uniqie_identifer', $notification->field)->select('fullName', 'member_uniqie_identifer', 'insurance', 'insurance_exp')->first();
                break;
            case 'trip':
                $dataNotif = Clients::where('id', $notification->value_id)->with('address')->first();
                break;
        }
        if ($role == 'admin') {
            $notification->new_admin = 0;
            if ($notification->model == 'client') {
                $companyName = '';
                $data = $dataNotif;
            } else if ($notification->model == 'trip') {
                $companyName = '';
                $data = $this->convertSingleDataForInfo($dataNotif);
            } else {
                $userData = User::with('Company')->find($notification->value_id);
                $companyName = $userData->company->name;
                $data = $dataNotif->original;
            }
        } else {
            $data = $dataNotif->original;
            $notification->new_vendor = 0;
            $companyName = $request->user()->name;
        }

        $notification->update();
        return response()->json(
            [
                'data' => $data,
                'model' => $notification->model,
                'companyName' => $companyName,
                'field' => ($notification->field ?? false),
            ],
            200
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Notification $notification
     * @return \Illuminate\Http\Response
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Notification $notification
     * @return \Illuminate\Http\Response
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Notification $notification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Notification $notification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
