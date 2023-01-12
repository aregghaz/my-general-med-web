<?php

namespace App\Http\Controllers\Vendor;
use App\Http\Controllers\Controller;
use App\Models\Cars;
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
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cars =  Cars::where('vendor_id', $request->user()->vendor_id)->where('id','!=', $request->user()->id)->get();
        return response()->json([
            'cars' => new CarsCollection($cars),
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $Year = Year::get();
        $Make = Make::get();
        return response()->json(
            [
                'year' => new StatusCollection($Year),
                'make' => new StatusCollection($Make),
            ],
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = json_decode($request->value);
        $validator = Validator::make((array) $data, [
            'name' => 'required|string',
            'surname' => 'string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'birthday' => 'string',
            'address' => 'string',
        ]);
        if ($validator->fails()) {
            return response()->json(
                [
                    'success' => 0,
                    'type' => 'validation_filed',
                    'error' => $validator->messages(),
                ],
                422
            );
        }
        $requestData = $validator->validated();
        $cars =  new Cars();
        $cars->make = $requestData->make;
        $cars->model = $requestData->model;
        $cars->year = $requestData->year;

        $inspection = $request->file('inspection');
        $inspection_name =
            time() + 4 . $inspection->getClientOriginalName();
        $inspection->move(
            "uploads/$request->user()->vendor_id",
            $inspection_name
        );
        $cars->inspection = $inspection;


        $insurance = $request->file('insurance');
        $insurance_name =
            time() + 4 . $insurance->getClientOriginalName();
        $insurance->move(
            "uploads/$request->user()->vendor_id",
            $insurance_name
        );
        $cars->insurance = $insurance_name;


        $vendor->motor_vehicle_record = $motor_vehicle_record;

        $cars->registration = $requestData->registration;
       
       

        $cars->liability = $requestData->liability;
    
        if (!$cars->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                403
            );
        }

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
