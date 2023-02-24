<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashBoardController extends Controller
{
    public function index()
    {
        $data = Clients::select(
            DB::raw('year(created_at) as year'),
            DB::raw('month(created_at) as month'),
            DB::raw('sum(price) as price'),
        )
            ->where(DB::raw('date(created_at)'), '>=', "2023-01-01")
            ->where('type_id', '=', 6)
            ->groupBy('month')
            ->orderBy('month')
            ->groupBy('year')
            // ->groupBy('month')
            ->get()
            ->toArray();


        $vendorProfitData = Clients::select(
//            DB::raw('year(created_at) as year'),
//            DB::raw('month(created_at) as month'),
            DB::raw('vendor_id as vendor_id'),
            DB::raw('sum(price) as price'),
        )
            ->where(DB::raw('date(created_at)'), '>=', "2023-01-01")
            ->where('vendor_id', '!=', null)
            ->groupBy('vendor_id')
            ->where('type_id', '=', 6)
            ///  ->groupBy('month')

            ->orderBy('vendor_id')
            ///   ->groupBy('year')
            ///  ->groupBy('vendor_id')
            // ->groupBy('month')
            ->get()
            ->toArray();

        $vendorTripCountData = Clients::select(
//            DB::raw('year(created_at) as year'),
//            DB::raw('month(created_at) as month'),
            DB::raw('vendor_id as vendor_id'),
            DB::raw('count(id) as count'),
        )
            ->where(DB::raw('date(created_at)'), '>=', "2023-01-01")
            ->where('vendor_id', '!=', null)
            ->where('type_id', '=', 6)
            ->groupBy('vendor_id')
            ///  ->groupBy('month')

            ->orderBy('vendor_id')
            ///   ->groupBy('year')
            ///  ->groupBy('vendor_id')
            // ->groupBy('month')
            ->get()
            ->toArray();

        $vendorsListData = User::where('role_id', 2)->select('name')->orderBy('id')->get()->toArray();

        $totalProfit = Clients::select(
//            DB::raw('year(created_at) as year'),
//            DB::raw('month(created_at) as month'),
          ///  DB::raw('vendor_id as vendor_id'),
            DB::raw('sum(price) as price'),
            DB::raw('count(id) as count'),
        )
            ->where(DB::raw('date(created_at)'), '>=', "2023-01-01")
            ->where('type_id', '=', 6)
            ->get()
            ->toArray();

        $vendorProfit = array_column($vendorProfitData, 'price');
        $profitInYear = array_column($data, 'price');
        $vendorsList = array_column($vendorsListData, 'name');
        $vendorTripCount = array_column($vendorTripCountData, 'count');


        return response()->json([
            'profitInYear' => $profitInYear,
            'vendorProfit' => [
                "profit" => $vendorProfit,
                'vendorsList' => $vendorsList
            ],
            'tripCount' => [
                "count" => $vendorTripCount,
                'vendorsList' => $vendorsList
            ],
            'totalProfit' => $totalProfit[0],
        ], 200);
    }
}
