<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfileEleve;

class EleveController extends Controller
{
    
    public function index(){

     $eleve = ProfileEleve::where('user_id', auth()->id())->first();

        $classe = $eleve->classe;

        $nbrEleves = $classe->eleves()->count();
        $nbrCour = $classe->cours()->count();
        $prof = $classe->prof;
        

        if (!$eleve) {
            return response()->json([
                "message" => "Profil élève introuvable"
            ], 404);
        }

        return response()->json([
            "classe" => $classe,
            "professeur" => $prof,
            "cours" => $nbrCour,
            "nombre_eleves" => $nbrEleves
        ]);
    }
        
        
}

