<?php

namespace App\Http\Controllers;


class HomeController extends Controller
{
    public function index()
    {
       
        $data = [
          
        ];
        return response()->json($data, 200);
    }

  
}
