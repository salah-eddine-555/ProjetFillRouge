<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\StatistiqueAdminController;
use App\Http\Controllers\AssingController;



Route::post('/register', [AuthController::class , 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/classes', [ClasseController::class, 'index']);
Route::get('/classes/{classe}', [ClasseController::class, 'show']);





Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class , 'logout']);
    Route::put('/profile', [ProfileController::class, 'updateProfile']);

    //Routes pour les actions admin 
        Route::middleware('admin')->group(function(){
            //statistiques pour admin
            Route::get('/statistiques', [StatistiqueAdminController::class, 'statistiques']);
            Route::get('/users', [StatistiqueAdminController::class, 'getUsers']);
            // Gestion des niveaux
            
                Route::get('/niveaux',[NiveauController::class, 'index']);
                Route::post('/niveaux', [NiveauController::class, 'store']);
                Route::put('/niveaux/{niveau}',[NiveauController::class, 'update']); 
                Route::delete('/niveaux/{niveau}',[NiveauController::class, 'destroy']); 
            
            // Gestion des matieres

            Route::get('/matieres', [MatiereController::class, 'index']);
            Route::post('/matieres', [MatiereController::class, 'store']);
            Route::put('/matieres/{matiere}', [MatiereController::class, 'update']);
            Route::delete('/matieres/{matiere}', [MatiereController::class, 'destroy']);
            
            //Gestion des classes
            Route::post('/classes', [ClasseController::class, 'store']);
            Route::put('/classes/{classe}', [ClasseController::class, 'update']);
            Route::delete('/classes/{classe}', [ClasseController::class, 'destroy']);

            //Assign des eleves
            Route::post('/assgine/eleves', [AssingController::class, 'AssingEelevsToClasse']);
            Route::get('/Nonassgine', [AssingController::class, 'getElevesNonAssigne']);
            Route::get('/assgine/prof', [AssingController::class, 'assigneProfToClasse']);
            Route::get('/professeurs', [AssingController::class, 'getProfesseurs']);
                
        });

    //Routes pour les actions professeur
    Route::middleware('prof')->group(function(){
            Route::post('/profile/prof', [ProfileController::class, 'storeProfileProf']);
    
    });

    //Routes pour les actions eleve
    Route::middleware('eleve')->group(function(){
        Route::post('/profile/eleve', [ProfileController::class, 'storeProfileEleve']);
    });

    
});
