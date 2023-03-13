<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Vendor\CarsController;
use App\Http\Controllers\Vendor\VendorUsersController;
use App\Http\Resources\NotificationCollection;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($showMore)
    {

        $notification = Notification::with('getAction')
            ->orderBy('new', "desc")
            ->orderBy('created_at', "desc")
            ->take(25 * $showMore)->get();;

        return response()->json(
            [
                'data' => new NotificationCollection($notification),
                'count' => Notification::where('new', 1)->count(),
            ],
            200
        );
    }

    public function getCount()
    {
        $notification = Notification::where('new', 1)->count();
        return response()->json(
            [
                'data' => $notification,
            ],
            200
        );
    }

    public function getInfo($id)
    {
        $notification = Notification::find($id);
        switch ($notification->model) {
            case 'driver':
                $data = VendorUsersController::show($notification->value_id);
                break;
            case 'car':
                $car = new CarsController();
                $data = $car->show($notification->value_id);
                break;
        }
        $notification->new = 0;
        $notification->update();
        return response()->json(
            [
                'data' => $data->original,
                'model' => $notification->model,
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
