<?php

use App\Http\Controllers\Admin\ActionsController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ClientsController;
use App\Http\Controllers\Admin\DashBoardController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\OperatorController;
use App\Http\Controllers\Admin\PriceListController;
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
Route::get('/test2', [\App\Http\Controllers\TestController::class, 'index2']);
Route::get('/test3', [\App\Http\Controllers\TestController::class, 'notificationCLinet']);
Route::post('/test', [\App\Http\Controllers\TestController::class, 'index']);
Route::get('/test1', [\App\Http\Controllers\TestController::class, 'notificationCars']);
Route::get('/test4', [\App\Http\Controllers\TestController::class, 'notificationTrips']);


Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::get('/getDate', [\App\Http\Controllers\TestController::class, 'getDate']);
    Route::get('/get-notification/{showMore}', [NotificationController::class, 'vendorNotification']);
    Route::get('/get-reason-data', [HomeController::class, 'getReasonData']);
    Route::get('/car-data-for-select', [HomeController::class, 'carDataForSelect']);


    Route::get('/get-driver-data', [ApiController::class, 'getDriverData']);
    Route::post('/clients-data-driver/', [ApiController::class, 'getClientsDataForDriver']);
    Route::get('/start-trip/{id}', [ApiController::class, 'startTrip']);
    Route::get('/done-trip/{id}', [ApiController::class, 'doneTrip']);
    Route::get('/client-route-driver/{id}', [ApiController::class, 'clientRoute']);
    Route::get('/client-data-driver/{id}', [ApiController::class, 'getClientDataForDriver']);


    Route::post('/clientData', [HomeController::class, 'clientData']);
    Route::post('/changeClientType', [HomeController::class, 'changeClientType']);
    Route::post('/assign-car-client', [HomeController::class, 'assignCarDriver']);
    Route::post('/updateClient/{id}', [App\Http\Controllers\ClientsController::class, 'updateClient']);
    Route::get('/make/{id}', [CarsController::class, 'getModel']);
    Route::resources([
        'home-data' => HomeController::class,
        'vendorClients' => VendorUsersController::class,
        'cars' => CarsController::class,
        'dashboard' => App\Http\Controllers\Vendor\DashboardController::class,
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
        Route::get('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    });
});
Route::group([
    'prefix' => 'admin', 'middleware' => 'auth:api'
], function () {
    Route::resources([
        'users' => UserController::class,
        'clients' => ClientsController::class,
        'operators' => OperatorController::class,
    ]);
    Route::get('/dashboard', [DashBoardController::class, 'index']);
    Route::post('/clientsData', [ClientsController::class, 'clientsData']);
    Route::get('/vendors', [VendorController::class, 'index']);
    Route::get('/vendors/create', [VendorController::class, 'create']);
    Route::post('/vendors', [VendorController::class, 'store']);
    Route::get('/vendors/{id}', [VendorController::class, 'show']);
    Route::put('/vendors/{id}', [VendorController::class, 'update']);
    Route::get('/getVendorUsers/{id}/{tabId}', [VendorController::class, 'getVendorUsers']);
    Route::get('/vendors/{id}/edit', [VendorController::class, 'edit']);
    Route::get('/vendor-data-for-select', [VendorController::class, 'getVendorDataSelect']);
    Route::get('/getActivityOperator/{id}', [ActionsController::class, 'getVendorDataSelect']);
    Route::get('/getActivityClient/{id}', [ActionsController::class, 'getActivityClient']);
    Route::post('/assign-vendor-client', [VendorController::class, 'setVendorTtoClient']);
    Route::get('/getVendorsByLosId/{id}', [VendorController::class, 'getVendorsByLosId']);
    Route::post('/updateClient/{id}', [AdminController::class, 'updateClient']);
    Route::get('/audit', [VendorController::class, 'audit']);
    Route::get('/get-price-list/{id}', [PriceListController::class, 'index']);
    Route::get('/get-notification/{typeId}/{showMore}', [NotificationController::class, 'index']);
    Route::get('/get-count', [NotificationController::class, 'getCount']);
    Route::get('/get-info/{id}/{role}', [NotificationController::class, 'getInfo']);
    Route::get('/changeStatus/{slug}', [AdminController::class, 'changeStatus']);
    Route::get('/changeStatus/{tabId}/create', [AdminController::class, 'createNewStatus']);
    Route::get('/deleteStatus/{statusId}/{id}', [AdminController::class, 'delete']);
    Route::get('/deleteTrip/{id}', [ClientsController::class, 'delete']);
    Route::get('/changeStatus/{id}/{statusId}', [AdminController::class, 'getStatusById']);
    Route::post('/changeStatus/{statusId}', [AdminController::class, 'createStatus']);
    Route::post('/set-price/{losId}/{vendorId}', [PriceListController::class, 'setPrice']);
    Route::put('/changeStatus/{statusId}/{id}', [AdminController::class, 'updateStatus']);
});
Route::group([
    'prefix' => 'operators', 'middleware' => 'auth:api'
], function () {
    Route::post('/getClients', [OperatorController::class, 'getClients']);

});
