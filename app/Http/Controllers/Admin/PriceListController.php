<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PriceList;
use App\Models\User;
use Illuminate\Http\Request;

class PriceListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id)
    {
        $user = User::with('los', 'los.services')->find($id);
        $los = [];
        foreach ($user->los as $index => $item) {
            $serviceData = [];
            ///    var_dump($index);
            foreach ($item->services as $service) {
                $serviceData[] = [
                    'id' => $service->id,
                    'name' => $service->name,
                    'slug' => $service->slug,
                ];
            }
            $los[] = [
                'name' => $item->name,
                'id' => $item->id,
                'services' => $serviceData
            ];

        }
        return response()->json(
            [
                'data' => [
                    'companyName' => $user->name,
                    'phoneNumber' => $user->phone_number,
                    'los' => $los,
                ],

                'status' => 200,
            ],
            201
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
     * @param \App\Models\PriceList $priceList
     * @return \Illuminate\Http\Response
     */
    public function show(PriceList $priceList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\PriceList $priceList
     * @return \Illuminate\Http\Response
     */
    public function edit(PriceList $priceList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\PriceList $priceList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PriceList $priceList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\PriceList $priceList
     * @return \Illuminate\Http\Response
     */
    public function destroy(PriceList $priceList)
    {
        //
    }
}
