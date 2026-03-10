<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::Post('/register', [AuthController::class , 'register']);
Route::Post('/login', [AuthController::class, 'login']);

Route::middleware('token')->group(function(){
    Route::Post('/logout', [AuthController::class , 'logout']);
});