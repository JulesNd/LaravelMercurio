<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JwtAuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RtiController;
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
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/signup', [JwtAuthController::class, 'register']);
    Route::post('/signin', [JwtAuthController::class, 'login']);
    Route::get('/user', [JwtAuthController::class, 'user']);
    Route::post('/token-refresh', [JwtAuthController::class, 'refresh']);
    Route::post('/signout', [JwtAuthController::class, 'signout']);


});
//get tout les employees
//Route::get('employees', [EmployeeController::class, 'getEmployee']);

//get tout les employees
//Route::get('useremployees', [EmployeeController::class, 'getUserEmployee']);

//get specific employee details
//Route::get('employee/{id}', [EmployeeController::class, 'getEmployeeById']);

//Ajouter des employee

//Route::post('addEmployee', [EmployeeController::class, 'addEmployee']);

// Update Employee
//Route::put('updateEmployee/{id}',[EmployeeController::class, 'updateEmployee']);

// Delete Employee
//Route::delete('deleteEmployee/{id}', [EmployeeController::class, 'deleteEmployee']);



//get tout les rtis
Route::get('rtis', [RtiController::class, 'getRti']);

//get tout les rtis
Route::get('userrtis', [RtiController::class, 'getUserRti']);

//get specific rti details
Route::get('rti/{rti_id}', [RtiController::class, 'getRtiById']);

//Ajouter des rti

Route::post('addRti', [RtiController::class, 'addRti']);

// Update Rti
Route::put('updateRti/{rti_id}',[RtiController::class, 'updateRti']);

// Delete Rti
Route::delete('deleteRti/{id}', [RtiController::class, 'deleteRti']);
