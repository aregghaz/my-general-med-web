<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarImageCollection;
use App\Http\Resources\CarsCollection;
use App\Http\Resources\DriverUserCollection;
use App\Http\Resources\FullNameCollection;
use App\Http\Resources\StatusCollection;
use App\Models\CarImages;
use App\Models\Cars;
use App\Models\Driver;
use App\Models\Make;
use App\Models\MakeModel;
use App\Models\User;
use App\Models\Year;
use Illuminate\Http\Request;

class CarsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $cars = Cars::where('vendor_id', $request->user()->vendor_id)->with('make', 'year', 'model', 'driver', 'driver.user')->orderBy('make_id', 'asc')->get();
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
        $drives = User::where(['role_id' => 3, 'vendor_id' => $vendorId])->whereHas('driver', function ($query) {
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = json_decode($request->value);

        $cars = new Cars();
        // dd($data->make);
        $cars->make_id = $data->make->id;
        $cars->model_id = $data->model->id;
        $cars->year_id = $data->year->id;
        $cars->vendor_id = $request->user()->vendor_id;
        $cars->registration = $data->registration;
        $cars->insurance_exp = date('Y-m-d', strtotime($data->insurance_exp));
        $cars->liability_exp = date('Y-m-d', strtotime($data->liability_exp));
        $cars->inspection_exp = date('Y-m-d', strtotime($data->inspection_exp));
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
            $cars->inspection = $this->getPdfFile($inspection, $vendorId, $carId);
        }
        if ($request->hasFile('insurance')) {
            $insurance = $request->file('insurance');
            $cars->insurance = $this->getPdfFile($insurance, $vendorId, $carId);
        }
        if ($request->hasFile('liability')) {
            $liability = $request->file('liability');
            $cars->liability = $this->getPdfFile($liability, $vendorId, $carId);
        }
        if ($request->hasFile('front')) {
            $carsImage = $request->file('front');
            $this->getImage($carsImage, $vendorId, $carId, 'front');
        }
        if ($request->hasFile('rear')) {
            $rear = $request->file('rear');
            $this->getImage($rear, $vendorId, $carId, 'rear');
        }
        if ($request->hasFile('right')) {
            $right = $request->file('right');
            $this->getImage($right, $vendorId, $carId, 'right');
        }
        if ($request->hasFile('left')) {
            $left = $request->file('left');
            $this->getImage($left, $vendorId, $carId, 'left');
        }
        if ($request->hasFile('interior_1')) {
            $interior1 = $request->file('interior_1');
            $this->getImage($interior1, $vendorId, $carId, 'interior_1');
        }
        if ($request->hasFile('interior_2')) {
            $interior2 = $request->file('interior_2');
            $this->getImage($interior2, $vendorId, $carId, 'interior_2');
        }

        if (!$cars->save()) {
            return response()->json(
                [
                    'success' => '0',
                    'type' => 'forbidden',
                ],
                403
            );
        }
        $this->saveNotification('Car', '', $cars->id, 7);
        if (isset($data->drivers)) {
            $ids = array_column($data->drivers, 'id');

            Driver::whereIn('id', $ids)->update(["car_id" => $cars->id]);

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

    public function getModel($id)
    {
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
     * @param \App\Models\Cars $cars
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $car = Cars::with('images')->find($id);

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
     * @param \App\Models\Cars $cars
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id, Request $request)
    {
        $cars = Cars::with('make', 'year', 'model', 'driver', 'driver.user')->find((int)$id);
        $year = Year::get();
        $make = Make::get();
        $vendorId = $request->user()->vendor_id;
        $drives = User::where(['role_id' => 3, 'vendor_id' => $vendorId])->whereHas('driver', function ($query) {
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
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Cars $cars
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id, Cars $cars)
    {
        $data = json_decode($request->value);
        $cars = Cars::with('make', 'year', 'model')->find((int)$id);
        $vendorId = $request->user()->vendor_id;
        // dd($request);
        $cars->make_id = $data->make->id;
        $cars->model_id = $data->model->id;
        $cars->year_id = $data->year->id;
        $cars->vendor_id = $vendorId;
        $cars->registration = $data->registration;

        $carId = $id;
        if ($request->hasFile('inspection')) {
            if (is_file(public_path($cars->inspection))) {
                $oldImage = public_path($cars->inspection);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $cars->inspection_exp = date('Y-m-d', strtotime($data->inspection_exp));
            $this->saveNotification('car', 'Car inspection', $id, 9);

            $inspection = $request->file('inspection');
            $cars->inspection = $this->getPdfFile($inspection, $vendorId, $carId);
        }
        if ($request->hasFile('insurance')) {
            if (is_file(public_path($cars->insurance))) {
                $oldImage = public_path($cars->insurance);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $insurance = $request->file('insurance');
            $cars->insurance = $this->getPdfFile($insurance, $vendorId, $carId);
            $cars->insurance_exp = date('Y-m-d', strtotime($data->insurance_exp));
            $this->saveNotification('car', 'Car insurance', $id, 9);

        }
        if ($request->hasFile('liability')) {
            if (is_file(public_path($cars->liability))) {
                $oldImage = public_path($cars->liability);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $liability = $request->file('liability');
            $cars->liability = $this->getPdfFile($liability, $vendorId, $carId);
            $cars->liability_exp = date('Y-m-d', strtotime($data->liability_exp));
            $this->saveNotification('car', 'Car liability', $id, 9);

        }
        if ($request->hasFile('front')) {
            $carsImage = $request->file('front');
            $this->getImage($carsImage, $vendorId, $carId, 'front');
        }
        if ($request->hasFile('rear')) {
            $rear = $request->file('rear');
            $this->getImage($rear, $vendorId, $carId, 'rear');
        }
        if ($request->hasFile('right')) {
            $right = $request->file('right');
            $this->getImage($right, $vendorId, $carId, 'right');
        }
        if ($request->hasFile('left')) {
            $left = $request->file('left');
            $this->getImage($left, $vendorId, $carId, 'left');
        }
        if ($request->hasFile('interior_1')) {
            $interior1 = $request->file('interior_1');
            $this->getImage($interior1, $vendorId, $carId, 'interior_1');
        }
        if ($request->hasFile('interior_2')) {
            $interior2 = $request->file('interior_2');
            $this->getImage($interior2, $vendorId, $carId, 'interior_2');
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

        Driver::whereIn('id', $ids)->update(["car_id" => $cars->id]);
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
     * @param \App\Models\Cars $cars
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cars $cars)
    {
        //
    }

    public function getCarData($car)
    {
//      dd($car->images);
        return [
            'id' => $car->id,
            ///'vendor_id' =>$vendor->vendor_id,
            'make' => [
                'id' => $car->make->id,
                'label' => $car->make->name,
                'name' => $car->make->name,
                "value" => $car->make->name,

            ],
            'model' => [
                'id' => $car->model->id,
                'label' => $car->model->name,
                'name' => $car->model->name,
                "value" => $car->model->name,

            ],
            'year' => [
                'id' => $car->year->id,
                'label' => $car->year->name,
                'name' => $car->year->name,
                "value" => $car->year->name,

            ],
            "drivers" => new DriverUserCollection($car->driver),
            'registration' => $car->registration,
            'inspection' => $car->inspection,
            'inspection_exp' => $car->inspection_exp,
            'insurance' => $car->insurance,
            'insurance_exp' => $car->insurance_exp,
            'liability' => $car->liability,
            'liability_exp' => $car->liability_exp,
            'images' => new CarImageCollection($car->images),
        ];
    }

    protected function getPdfFile($file, $vendorId, $carId): string
    {
        $fileData = $file;
        $file_name =
            time() + Rand(1, 700) . $file->getClientOriginalName();
        $fileData->move(
            public_path() . "/uploads/$vendorId/file/$carId/",
            $file_name
        );
        return "/uploads/$vendorId/file/$carId/$file_name";
    }

    protected function getImage($file, $vendorId, $carId, $key): bool
    {

        $oldData = CarImages::where('car_id', $carId)->where('key', $key)->first();
        if (isset($oldData)) {
            if (is_file(public_path($oldData->value))) {
                $oldImage = public_path($oldData->value);
                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }
            $front_name =
                time() + 7 . $file->getClientOriginalName();
            $file->move(
                public_path() . "/uploads/$vendorId/car/$carId/",
                $front_name
            );
            $oldData->value = "/uploads/$vendorId/car/$carId/$front_name";

            return $oldData->update();
        } else {
            $carsImage = new CarImages();

            $front_name =
                time() + 7 . $file->getClientOriginalName();
            $file->move(
                public_path() . "/uploads/$vendorId/car/$carId/",
                $front_name
            );
            $carsImage->car_id = $carId;
            $carsImage->key = $key;
            $carsImage->value = "/uploads/$vendorId/car/$carId/$front_name";
            return $carsImage->save();
        }
    }


}
