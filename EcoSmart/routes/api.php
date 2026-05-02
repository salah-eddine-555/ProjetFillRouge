<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClasseController;
use App\Http\Controllers\StatistiqueAdminController;
use App\Http\Controllers\AssingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DocumentController;

use App\Http\Controllers\StatistiqueProfController;
use App\Http\Controllers\CourController;





Route::post('/register', [AuthController::class , 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/classes', [ClasseController::class, 'index']);
Route::get('/classes/{classe}', [ClasseController::class, 'show']);





Route::middleware(['auth:sanctum', 'is_active'])->group(function(){
    Route::post('/logout', [AuthController::class , 'logout']);
    Route::put('/profile', [ProfileController::class, 'updateProfile']);

    Route::get('/matieres', [MatiereController::class, 'index']);

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

            
            Route::post('/matieres', [MatiereController::class, 'store']);
            Route::put('/matieres/{matiere}', [MatiereController::class, 'update']);
            Route::delete('/matieres/{matiere}', [MatiereController::class, 'destroy']);
            
            //Gestion des classes
            Route::post('/classes', [ClasseController::class, 'store']);
            Route::put('/classes/{classe}', [ClasseController::class, 'update']);
            Route::delete('/classes/{classe}', [ClasseController::class, 'destroy']);

            //Assign des eleves
            Route::post('/assgine/eleves', [AssingController::class, 'AssingEelevsToClasse']);
            Route::post('/assgine/prof', [AssingController::class, 'AssigneProfToClasse']);

            Route::get('/Nonassgine', [AssingController::class, 'getElevesNonAssigne']);
            Route::get('/assgine/prof', [AssingController::class, 'assigneProfToClasse']);
            Route::get('/professeurs', [AssingController::class, 'getProfesseurs']);
            Route::post('/retirer', [AssingController::class, 'RetireEleveFromClasse']);

            Route::patch('/users/{id}/statut', [UserController::class, 'UpdateStatutUser']);

                
        });

    //Routes pour les actions professeur
    Route::middleware('prof')->group(function(){
            Route::post('/profile/prof', [ProfileController::class, 'storeProfileProf']);
            Route::get('/prof/statistiques', [StatistiqueProfController::class, 'Statistiques']);

            // route pours recupres les cours cree par le prof a connecter 

            Route::get('/prof/cours', [CourController::class, 'getCourParProf']);

            //Gestion des cours
            Route::post('/cours', [CourController::class, 'store']);
            Route::get('/cours/{cour}', [CourController::class, 'show']);
            Route::post('/cours/{cour}/assign-classe', [CourController::class, 'assignClasseToCours']);

            Route::post('/cours/{cour}/documents', [DocumentController::class, 'store']);
            //gestion des documents 
            Route::get('/documents/{cour}/cours', [DocumentController::class, 'getDocumentParCour']);
            Route::put('/documents/{document}', [DocumentController::class, 'update']);

            Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);

            Route::get('/classe/{classe}/cours', [CourController::class, 'CourParClasse']);
            
    
    });

    //Routes pour les actions eleve
    Route::middleware('eleve')->group(function(){
        Route::post('/profile/eleve', [ProfileController::class, 'storeProfileEleve']);
    });

    
});
