<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class HomeController extends Controller
{
    public function index(Request $request)
    {
        $vendorID = Auth::user()->vendor_id;
        $showMore = $request->showmore;
      
     
        if(Isset($request->querySearch)){
        
            
            $clients = Clients::where('vendor_id', $vendorID)->where( 'client_id', 'LIKE', '%' . $request->querySearch . '%' )->orWhere( 'driver_id', 'LIKE', '%' . $request->querySearch . '%' )->paginate(20);

        }else{
            $clients = Clients::select(
                'id',
            'client_id',
            "driver_id",
            'name',
            'surname',
            'email',
            'pick_up_address',
            'drop_down_address',
            'apartament_number',
            // 'ccn',
            'id_number',
            'birthday')->paginate(20);

        }
        return response()->json([
           'users' => $clients,
        //    "count"=> (Clients::count() / 20)
        ], 200);
    }

  
}
