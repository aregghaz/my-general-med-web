<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Models\Clients;
use Illuminate\Http\Request;
class HomeController extends Controller
{
    public function index(Request $request)
    {
       //  dd($request->showmore);
        $showMore = $request->showmore;
      
        if(Isset($request->querySearch)){
        
            
            $clients = Clients::where( 'client_id', 'LIKE', '%' . $request->querySearch . '%' )->orWhere( 'driver_id', 'LIKE', '%' . $request->querySearch . '%' )->paginate(20);

        }else{
            $clients = Clients::paginate(20);

        }
        return response()->json([
           'users' => $clients,
        //    "count"=> (Clients::count() / 20)
        ], 200);
    }

  
}
