<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Cars;
use App\Models\Clients;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $vendorId = $request->user()->vendor_id;
        $cars = Cars::where('vendor_id', $vendorId)->with('driver.user')->orderBy("id")->get();
        $driverName = [];
        foreach ($cars as $index => $car) {
            $driverName[$index] = '';
            foreach ($car->driver as $key => $driver) {
                $driverName[$index] .= ($key >= 1 ? '-' : '') . $driver->user->name;
            }
        }
        $carsIdData = array_column($cars->toArray(), 'id');
//
        $data = Clients::select(
            DB::raw('year(date_of_service) as year'),
            DB::raw('month(date_of_service) as month'),
            DB::raw('sum(price) as price'),
        )
            ->where(DB::raw('date(date_of_service)'), '>=', "2023-01-01")
            ->where(DB::raw('vendor_id'), '=', $vendorId)
            ->where('type_id', '=', 6)
            ->groupBy('month')
            ->orderBy('month')
            ->groupBy('year')
            // ->groupBy('month')
            ->get()
            ->toArray();

        $vendorProfitData = Clients::select(
            DB::raw('car_id as car_id'),
            DB::raw('sum(price) as price'),
        )
            ->where(DB::raw('date(date_of_service)'), '>=', "2023-01-01")
            ->whereIn('car_id', $carsIdData)
            ->groupBy('car_id')
            ->where('type_id', '=', 6)
            ->orderBy('car_id')
            ->get()
            ->toArray();

        $vendorTripCountData = Clients::select(
            DB::raw('car_id as car_id'),
            DB::raw('count(id) as count'),
        )
            ->where(DB::raw('date(date_of_service)'), '>=', "2023-01-01")
            ->whereIn('car_id', $carsIdData)
            ->where('type_id', '=', 6)
            ->groupBy('car_id')
            ->orderBy('car_id')
            ->get()
            ->toArray();

        $vendorsListData = User::where('role_id', 2)->select('name')->orderBy('id')->get()->toArray();

        $totalProfit = Clients::select(
            DB::raw('sum(price) as price'),
            DB::raw('count(id) as count'),
        )
            ->where(DB::raw('date(date_of_service)'), '>=', "2023-01-01")
            ->where(DB::raw('vendor_id'), '=', $vendorId)
            ->where('type_id', '=', 6)
            ->get()
            ->toArray();
///dd($vendorProfitData);
        $vendorProfit = array_column($vendorProfitData, 'price');
        $profitInYear = array_column($data, 'price');

        $vendorTripCount = array_column($vendorTripCountData, 'count');

        return response()->json([
            'profitInYear' => $profitInYear,
            'vendorProfit' => [
                "profit" => $vendorProfit,
                'vendorsList' => $driverName
            ],
            'tripCount' => [
                "count" => $vendorTripCount,
                'vendorsList' => $driverName
            ],
            'totalProfit' => $totalProfit[0],
        ], 200);
    }
}
