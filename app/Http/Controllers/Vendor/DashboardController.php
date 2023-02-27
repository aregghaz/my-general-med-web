<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use App\Models\Cars;
use App\Models\Clients;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $vendorId = $request->user()->vendor_id;
        $carsId = Cars::where('vendor_id',$vendorId)->with('driver.user')->get()->toArray();

        $carsIdData = array_column($carsId, 'id');
//        $carsName =     Driver::select(
//            DB::raw('car_id as car_id'),
//            DB::raw('id as id'),
//        )->whereIn('car_id', $carsId)->groupBy('car_id')->groupBy('id')->get();
     ///   dd($carsId);
//        dd($carsName);
        $data = Clients::select(
            DB::raw('year(created_at) as year'),
            DB::raw('month(created_at) as month'),
            DB::raw('sum(price) as price'),
        )
            ->where(DB::raw('date(created_at)'), '>=', "2023-01-01")
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
            ->where(DB::raw('date(created_at)'), '>=', "2023-01-01")
            ->whereIn('car_id',  $carsIdData)
            ->groupBy('car_id')
            ->where('type_id', '=', 6)
            ->orderBy('car_id')
            ->get()
            ->toArray();

        $vendorTripCountData = Clients::select(
            DB::raw('car_id as car_id'),
            DB::raw('count(id) as count'),
        )
            ->where(DB::raw('date(created_at)'), '>=', "2023-01-01")
            ->whereIn('car_id',  $carsIdData)
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
            ->where(DB::raw('date(created_at)'), '>=', "2023-01-01")
            ->where(DB::raw('vendor_id'), '=', $vendorId)
            ->where('type_id', '=', 6)
            ->get()
            ->toArray();

        $vendorProfit = array_column($vendorProfitData, 'price');
        $profitInYear = array_column($data, 'price');

        $vendorTripCount = array_column($vendorTripCountData, 'count');

        return response()->json([
            'profitInYear' => $profitInYear,
            'vendorProfit' => [
                "profit" => $vendorProfit,
                'vendorsList' => $vendorsListData
            ],
            'tripCount' => [
                "count" => $vendorTripCount,
                'vendorsList' => $vendorsListData
            ],
            'totalProfit' => $totalProfit[0],
        ], 200);
    }
}
