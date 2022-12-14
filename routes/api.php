<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\WeatherApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        // Route::get('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    });
});
Route::group([
    'prefix' => 'admin'
], function () {
    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::resources([
            'home-data' => HomeController::class,
            'users' => \App\Http\Controllers\UserController::class,
        
        ]);
    });
});
