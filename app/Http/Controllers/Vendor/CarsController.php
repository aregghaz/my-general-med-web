<?php

namespace App\Http\Controllers\Vendor;
use App\Http\Controllers\Controller;
use App\Http\Resources\DriverUserCollection;
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
        $cars =  Cars::where('vendor_id', $request->user()->vendor_id)->with('make','year', 'model','driver','driver.user')->get();
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
        $drives = User::where(['role_id'=> 3, 'vendor_id' =>$vendorId])->whereHas('driver', function ($query) {
            $query->where('car_id', null);
        })->get();
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id,Request $request)
    {
         $cars = Cars::with('make','year', 'model', 'driver','driver.user')->find((int)$id);
        $year = Year::get();
        $make = Make::get();
        $vendorId = $request->user()->vendor_id;
        $drives = User::where(['role_id'=> 3, 'vendor_id' =>$vendorId])->whereHas('driver', function ($query) {
            $query->where('car_id', null);
        })->get();
        return response()->json(
            [
                'data' => $this->getCarData($cars),
                'year' => new StatusCollection($year),
                'make' => new StatusCollection($make),
                'drivers' => new FullNameCollection($drives),
            ],
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cars  $cars
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request,$id, Cars $cars)
    {
        $data = json_decode($request->value);
        $cars = Cars::with('make','year', 'model')->find((int)$id);

       // dd($request);
        $cars->make_id =$data->make->id;
        $cars->model_id = $data->model->id;
        $cars->year_id = $data->year->id;
        $cars->vendor_id = $request->user()->vendor_id;
        $cars->registration = $data->registration;

        if ($request->hasFile('inspection')) {
            $inspection = $request->file('inspection');
            $inspection_name =
                time() + 4 . $inspection->getClientOriginalName();
            $inspection->move(
                "uploads/$request->user()->vendor_id",
                $inspection_name
            );
            $cars->inspection = $inspection_name;
        }
        if ($request->hasFile('insurance')) {
            $insurance = $request->file('insurance');
            $insurance_name =
                time() + 4 . $insurance->getClientOriginalName();
            $insurance->move(
                "uploads/$request->user()->vendor_id",
                $insurance_name
            );
            $cars->insurance = $insurance_name;
        }
        if ($request->hasFile('liability')) {

            $liability = $request->file('liability');
            $liability_name =
                time() + 4 . $liability->getClientOriginalName();
            $liability->move(
                "uploads/$request->user()->vendor_id",
                $liability_name
            );
            $cars->liability = $liability_name;
        }

        if (!$cars->update()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                403
            );
        }
        $ids = array_column($data->drivers, 'id');

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

    public function getCarData($car){
    ///  dd($car->driver);
        return [
            'id' => $car->id,
            ///'vendor_id' =>$vendor->vendor_id,
            'make'=> [
                'id' => $car->make->id,
                'label' => $car->make->name,
                'name' => $car->make->name,
                "value"=> $car->make->name,

            ],
            'model'=>[
                    'id' => $car->model->id,
                    'label' => $car->model->name,
                    'name' => $car->model->name,
                    "value"=> $car->model->name,

                ],
            'year'=>[
                'id' => $car->year->id,
                'label' => $car->year->name,
                'name' => $car->year->name,
                "value"=> $car->year->name,

            ],
            "drivers" => new DriverUserCollection($car->driver),
            'registration'=> $car->registration,
            'inspection'=> $car->inspection,
            'insurance'=> $car->insurance,
            'liability'=> $car->liability,
        ];
    }
}
