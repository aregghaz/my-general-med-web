<?php

namespace App\Http\Controllers\Vendor;
use App\Http\Controllers\Controller;
use App\Http\Resources\CarImageCollection;
use App\Http\Resources\DriverUserCollection;
use App\Http\Resources\FullNameCollection;
use App\Models\CarImages;
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
        $vendorId = $request->user()->vendor_id;
        if (!$cars->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                403
            );
        }
        $carId = $cars->id;
        if ($request->hasFile('inspection')) {
            $inspection = $request->file('inspection');
            $cars->inspection = $this->getPdfFile($inspection,$vendorId,$carId);
        }
        if ($request->hasFile('insurance')) {
            $insurance = $request->file('insurance');
            $cars->insurance = $this->getPdfFile($insurance,$vendorId,$carId);
        }
        if ($request->hasFile('liability')) {
            $liability = $request->file('liability');
            $cars->liability = $this->getPdfFile($liability,$vendorId,$carId);
        }
        if ($request->hasFile('front')) {
            $carsImage =  $request->file('front');
            $this->getImage($carsImage,$vendorId,$carId,'front');
        }
        if ($request->hasFile('rear')) {
            $rear = $request->file('rear');
            $this->getImage($rear,$vendorId,$carId,'rear');
        }
        if ($request->hasFile('right')) {
            $right = $request->file('right');
            $this->getImage($right,$vendorId,$carId,'right');
        }
        if ($request->hasFile('left')) {
            $left = $request->file('left');
            $this->getImage($left,$vendorId,$carId,'left');
        }
//        if ($request->hasFile('right')) {
//            $right = $request->file('right');
//            $this->getImage($right,$vendorId,$carId,'right');
//        }


        if (!$cars->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                403
            );
        }
        if(isset($data->drivers)){
            $ids = array_column($data->drivers, 'id');

            Driver::whereIn('id',$ids)->update(["car_id"=> $cars->id]);

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



    protected function getPdfFile($file,$vendorId,$carId): string
    {
        $fileData = $file;
        $file_name =
            time() + Rand(1,700). $file->getClientOriginalName();
        $fileData->move(
            public_path() . "/uploads/$vendorId/file/$carId/",
            $file_name
        );
        return "/uploads/$vendorId/file/$carId/$file_name";
    }
    protected function getImage($file,$vendorId,$carId,$key): bool
 {
     $oldData = CarImages::where('car_id', $carId)->where('key', $key)->first();

     if(isset($oldData)){
         if(is_file(public_path($oldData->value))) {
             $oldImage = public_path($oldData->value);
             if (file_exists($oldImage)) {
                 unlink($oldImage);
             }
         }
         $front_name =
             time() + 7 . $file->getClientOriginalName();
         $file->move(
             public_path() ."/uploads/$vendorId/car/$carId/",
             $front_name
         );
         $oldData->value = "/uploads/$vendorId/car/$carId/$front_name";

         return $oldData->update();
     }else{
         $carsImage = new CarImages();

         $front_name =
             time() + 7 . $file->getClientOriginalName();
         $file->move(
             public_path() ."/uploads/$vendorId/car/$carId/",
             $front_name
         );
         $carsImage->car_id = $carId;
         $carsImage->key = $key;
         $carsImage->value = "/uploads/$vendorId/car/$carId/$front_name";
         return $carsImage->save();
     }
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Cars $cars, $id)
    {
        $car  = Cars::with('images')->find($id);

        return response()->json(
            [
                'data' => $this->getCarData($car),
            ],
            200
        );
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
        $vendorId = $request->user()->vendor_id;
       // dd($request);
        $cars->make_id =$data->make->id;
        $cars->model_id = $data->model->id;
        $cars->year_id = $data->year->id;
        $cars->vendor_id = $vendorId;
        $cars->registration = $data->registration;

        $carId = $id;
        if ($request->hasFile('inspection')) {
            if(is_file(public_path($cars->inspection))) {
                $oldImage = public_path($cars->inspection);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $inspection = $request->file('inspection');
            $cars->inspection = $this->getPdfFile($inspection,$vendorId,$carId);
        }
        if ($request->hasFile('insurance')) {
            if(is_file(public_path($cars->insurance))) {
                $oldImage = public_path($cars->insurance);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $insurance = $request->file('insurance');
            $cars->insurance = $this->getPdfFile($insurance,$vendorId,$carId);
        }
        if ($request->hasFile('liability')) {
            if(is_file(public_path($cars->liability))) {
                $oldImage = public_path($cars->liability);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $liability = $request->file('liability');
            $cars->liability = $this->getPdfFile($liability,$vendorId,$carId);
        }
        if ($request->hasFile('front')) {
            $carsImage =  $request->file('front');
            $this->getImage($carsImage,$vendorId,$carId,'front');
        }
        if ($request->hasFile('rear')) {
            $rear = $request->file('rear');
            $this->getImage($rear,$vendorId,$carId,'rear');
        }
        if ($request->hasFile('right')) {
            $right = $request->file('right');
            $this->getImage($right,$vendorId,$carId,'right');
        }
        if ($request->hasFile('left')) {
            $left = $request->file('left');
            $this->getImage($left,$vendorId,$carId,'left');
        }
//        if ($request->hasFile('right')) {
//            $right = $request->file('right');
//            $this->getImage($right,$vendorId,$carId,'right');
//        }

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
//      dd($car->images);
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
            'inspection'=>$car->inspection,
            'insurance'=> $car->insurance,
            'liability'=> $car->liability,
            'images' => new CarImageCollection($car->images),
        ];
    }
}
