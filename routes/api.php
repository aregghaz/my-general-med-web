<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\Vendor\CarsController;
use App\Http\Controllers\Vendor\VendorUsersController;

use App\Http\Controllers\WeatherApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;

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


Route::post('/test', [\App\Http\Controllers\TestController::class, 'index']);

Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::post('/clientData', [HomeController::class, 'clientData']);
    Route::post('/changeClientType', [HomeController::class, 'changeClientType']);
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
        'clients' => ClientsController::class,
        'users'=> UserController::class,
    ]);
    Route::resources([
        ///'home-data' => HomeController::class,
        'users' => \App\Http\Controllers\UserController::class,
        'clients' => \App\Http\Controllers\ClientsController::class,
        ///'vendors' => \App\Http\Controllers\VendorController::class,

    ]);
    Route::get('/vendors', [VendorController::class, 'index']);
    Route::get('/vendors/create', [VendorController::class, 'create']);
    Route::get('/vendors/create', [VendorController::class, 'create']);
    Route::post('/vendors', [VendorController::class, 'store']);
    Route::get('/vendors/{id}', [VendorController::class, 'show']);
    Route::put('/vendors/{id}', [VendorController::class, 'update']);
    Route::get('/getVendorUsers/{id}', [VendorController::class, 'getVendorUsers']);
    Route::get('/vendors/{id}/edit', [VendorController::class, 'edit']);

    Route::get('/changeStatus/{slug}', [AdminController::class, 'changeStatus']);
    Route::get('/changeStatus/{slug}/{id}', [AdminController::class, 'getStatusById']);
    Route::post('/changeStatus/{slug}', [AdminController::class, 'createStatus']);
});
