<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientCollection;
use App\Models\Clients;

class HomeController extends Controller
{
    public function index()
    {
        $clients = Clients::get();
        return response()->json([
           'users' => new ClientCollection($clients),
           "count"=> count($clients)
        ], 200);
    }

  
}
