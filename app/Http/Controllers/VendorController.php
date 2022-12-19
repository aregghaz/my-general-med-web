<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\VendorsCollection;

use App\Http\Resources\StatusCollection;
use Illuminate\Support\Facades\DB;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vendorData =Vendor::paginate(20);

        if(Isset($request->querySearch)){
        
            
            $vendorData =Vendor::where( 'client_id', 'LIKE', '%' . $request->querySearch . '%' )->orWhere( 'driver_id', 'LIKE', '%' . $request->querySearch . '%' )->paginate(20);

        }else{




            $vendorData =Vendor::paginate(20);


        }


        return response()->json([
            "current_page" =>  $vendorData->toArray()['current_page'],
            "last_page" => $vendorData->toArray()['last_page'],
            "to" => 5,
            "total" =>  $vendorData->toArray()['total'],
            'vendors' => new VendorsCollection($vendorData),
         ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $status = DB::table('status')->get();
        $users = User::get();
        return response()->json([
            'users' => new StatusCollection($users),
            'status' => new StatusCollection($status)
         ], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function show(Vendor $vendor)
    {
        $status = DB::table('status')->get();
        $users = User::get();
    
        return response()->json([
            "data"=>$vendor,
            'users' => new StatusCollection($users),
            'status' => new StatusCollection($status)
         ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function edit(Vendor $vendor)
    {
        $status = DB::table('status')->get();
        $users = User::get();
     
        return response()->json([
            "data"=>$vendor,
            'users' => new StatusCollection($users),
            'status' => new StatusCollection($status)
         ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vendor $vendor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor)
    {
        //
    }
}
