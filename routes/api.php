<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\OperatorController;
use App\Http\Controllers\Admin\VendorController;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Vendor\CarsController;
use App\Http\Controllers\Vendor\VendorUsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::post('/test', [\App\Http\Controllers\TestController::class, 'index']);

    Route::get('/car-data-for-select', [HomeController::class, 'carDataForSelect']);
    Route::get('/clients-data-driver', [ApiController::class, 'getClientsDataForDriver']);
    Route::get('/client-data-driver/{id}', [ApiController::class, 'getClientDataForDriver']);
    Route::post('/clientData', [HomeController::class, 'clientData']);
    Route::post('/changeClientType', [HomeController::class, 'changeClientType']);
    Route::post('/assign-car-client', [HomeController::class, 'assignCarDriver']);
    Route::get('/make/{id}', [CarsController::class, 'getModel']);
    Route::resources([
        'home-data' => HomeController::class,
        'vendorClients' => VendorUsersController::class,
        'cars' => CarsController::class,
    ]);
});
Route::group([
    'prefix' => 'auth'
], function () {

    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('signup', [\App\Http\Controllers\AuthController::class, 'signup']);
    Route::get('getFormData', [\App\Http\Controllers\AuthController::class, 'registerForm']);

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('user', [\App\Http\Controllers\AuthController::class, 'user']);
        // Route::get('account-data', [\App\Http\Controllers\AuthController::class, 'userData']);
        // Route::post('reset', [\App\Http\Controllers\AuthController::class, 'reset']);

        // /////TOODO CHECK THIS PART
        // Route::post('uploadAvatar', [\App\Http\Controllers\AuthController::class, 'uploadAvatar']);
        // Route::post('edit', [\App\Http\Controllers\AuthController::class, 'edit']);
        Route::get('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    });
});
Route::group([
    'prefix' => 'admin', 'middleware' => 'auth:api'
], function () {
    Route::resources([
        'users'=> UserController::class,
        'clients' => \App\Http\Controllers\ClientsController::class,
        'operators' => OperatorController::class,

    ]);
    Route::post('/clientsData', [\App\Http\Controllers\Admin\ClientsController::class, 'clientsData']);
    Route::get('/vendors', [VendorController::class, 'index']);
    Route::get('/vendors/create', [VendorController::class, 'create']);
    Route::post('/vendors', [VendorController::class, 'store']);
    Route::get('/vendors/{id}', [VendorController::class, 'show']);
    Route::put('/vendors/{id}', [VendorController::class, 'update']);
    Route::get('/getVendorUsers/{id}/{tabId}', [VendorController::class, 'getVendorUsers']);
    Route::get('/vendors/{id}/edit', [VendorController::class, 'edit']);
    Route::get('/vendor-data-for-select', [VendorController::class, 'getVendorDataSelect']);
    Route::post('/assign-vendor-client', [VendorController::class, 'setVendorTtoClient']);

    Route::get('/audit', [VendorController::class, 'audit']);
    Route::get('/changeStatus/{slug}', [AdminController::class, 'changeStatus']);
    Route::get('/changeStatus/{slug}/{id}', [AdminController::class, 'getStatusById']);
    Route::post('/changeStatus/{slug}', [AdminController::class, 'createStatus']);
});
Route::group([
    'prefix' => 'operators', 'middleware' => 'auth:api'
], function () {
    Route::post('/getClients', [OperatorController::class, 'getClients']);

});
