<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientActivityCollection;
use App\Http\Resources\OperatorActionCollection;
use App\Models\Actions;
use Illuminate\Http\Request;

class ActionsController extends Controller
{


    public function getVendorDataSelect($id)
    {

        $actions = Actions::where('user_id', $id)->with(['getClient', 'getOperator', 'getVendor', 'getAction'])->get();
        return response()->json([
            'actions' => new OperatorActionCollection($actions),
        ], 200);
    }

    public function getActivityClient($id)
    {

        $actions = Actions::where('client_id', $id)->with(['getClient', 'getOperator', 'getVendor', 'getAction'])->get();
        return response()->json([
            'actions' => new ClientActivityCollection($actions),
        ], 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param \App\Models\Actions $actions
     * @return \Illuminate\Http\Response
     */
    public function show(Actions $actions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Actions $actions
     * @return \Illuminate\Http\Response
     */
    public function edit(Actions $actions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Actions $actions
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Actions $actions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Actions $actions
     * @return \Illuminate\Http\Response
     */
    public function destroy(Actions $actions)
    {
        //
    }
}
