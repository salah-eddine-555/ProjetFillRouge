<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\MatiereController;



Route::post('/register', [AuthController::class , 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class , 'logout']);

    //Routes pour les actions admin 
    Route::middleware('admin')->group(function(){
        // Gestion des niveaux
            Route::get('/niveaux',[NiveauController::class, 'index']);
            Route::post('/niveaux', [NiveauController::class, 'store']);
            Route::put('/niveaux/{niveau}',[NiveauController::class, 'update']); 
            Route::delete('/niveaux/{niveau}',[NiveauController::class, 'destroy']); 
        
        // Gestion des matieres

        Route::get('/matieres', [MatiereController::class, 'index']);
        Route::post('/matieres', [MatiereController::class, 'store']);
        Route::put('/matieres/{matiere}', [MatiereController::class, 'update']);
        Route::patch('/matieres/{matiere}', [MatiereController::class, 'update']);
        Route::delete('/matieres/{matiere}', [MatiereController::class, 'destroy']);

            
    });

    //Routes pour les actions professeur
    Route::middleware('prof')->group(function(){
        //
    });

    //Routes pour les actions eleve
    Route::middleware('eleve')->group(function(){
        //
    });


});
