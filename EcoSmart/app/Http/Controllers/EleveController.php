<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfileEleve;
use Illuminate\Support\Facades\Auth;
use App\Models\Cour;

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
            "professeur" => $prof->user,
            "cours" => $nbrCour,
            "nombre_eleves" => $nbrEleves
        ]);
    }

    public function getCourEleve(){
        $eleve = Auth::user()->eleve;
        // dd($eleve->id);
        $cours = $eleve->classe->cours;


        return response()->json([
            'success'=> true,
            'data' => $cours->load('matiere')
        ]);
    }

    public function showDetailsCour(Cour $cour){

        $details = $cour->load(['matiere', 'documents']);
   

        return response()->json([
            'data' => $details,
        ]);
    }
        
        
}

