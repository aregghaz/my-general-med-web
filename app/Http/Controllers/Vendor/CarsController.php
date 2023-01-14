<?php

namespace App\Http\Controllers\Vendor;
use App\Http\Controllers\Controller;
use App\Http\Resources\FullNameCollection;
use App\Models\Cars;
use App\Models\Driver;
use App\Models\MakeModel;
use App\Models\User;
use App\Models\Year;
use App\Models\Make;
use Illuminate\Http\Request;
use App\Http\Resources\CarsCollection;
use App\Http\Resources\StatusCollection;

class CarsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $cars =  Cars::where('vendor_id', $request->user()->vendor_id)->with('make','year', 'model')->get();
        return response()->json([
            'cars' => new CarsCollection($cars),
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $year = Year::get();
        $make = Make::get();
        $vendorId = $request->user()->vendor_id;
        $drives = User::where(['role_id'=> 3, 'vendor_id' =>$vendorId])->whereHas('driver')->get();
        return response()->json(
            [
                'year' => new StatusCollection($year),
                'make' => new StatusCollection($make),
                'drivers' => new FullNameCollection($drives),
            ],
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = json_decode($request->value);

        $cars =  new Cars();
       // dd($data->make);
        $cars->make_id =$data->make->id;
        $cars->model_id = $data->model->id;
        $cars->year_id = $data->year->id;
        $cars->vendor_id = $request->user()->vendor_id;
        $cars->registration = $data->registration;

        $inspection = $request->file('inspection');
        $inspection_name =
            time() + 4 . $inspection->getClientOriginalName();
        $inspection->move(
            "uploads/$request->user()->vendor_id",
            $inspection_name
        );
        $cars->inspection = $inspection_name;


        $insurance = $request->file('insurance');
        $insurance_name =
            time() + 4 . $insurance->getClientOriginalName();
        $insurance->move(
            "uploads/$request->user()->vendor_id",
            $insurance_name
        );
        $cars->insurance = $insurance_name;

        $liability = $request->file('liability');
        $liability_name =
            time() + 4 . $liability->getClientOriginalName();
        $liability->move(
            "uploads/$request->user()->vendor_id",
            $liability_name
        );
        $cars->liability = $liability_name;


        if (!$cars->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                403
            );
        }
        $ids = array_column($data->drivers, 'id');
//        $cars->driver()->save($ids);
     //   dd($ids);
       Driver::whereIn('id',$ids)->update(["car_id"=> $cars->id]);

        return response()->json(
            [
                'success' => '1',
                'type' => 'success',
                'status' => 200,
            ],
            201
        );
    }
    public function getModel($id) {
        $Make = MakeModel::where('make_id', $id)->get();
        return response()->json(
            [
                'make' => new StatusCollection($Make),
            ],
            200
        );
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cars  $cars
     * @return \Illuminate\Http\Response
     */
    public function show(Cars $cars)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cars  $cars
     * @return \Illuminate\Http\Response
     */
    public function edit(Cars $cars)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cars  $cars
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cars $cars)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cars  $cars
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cars $cars)
    {
        //
    }
}
