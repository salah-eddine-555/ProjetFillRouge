<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Classe;
use App\Models\Matiere;

class StatistiqueAdminController extends Controller
{
    public function statistiques(){
        
        $totalEleves = User::whereHas('role', function($query){
            $query->where('name', 'eleve');
        })->count();

        $totalProfesseurs = User::whereHas('role', function($query){
            $query->where('name', 'professeur');
        })->count();

        $totalClasse = Classe::count();
        $totalMatiere = Matiere::count();

        return response()->json([
            'success'=> true,
            'data'=> [
                'total_eleves' => $totalEleves,
                'total_professeurs' => $totalProfesseurs,
                'total_classes' => $totalClasse,
                'total_matieres' => $totalMatiere,
            ]
        ]);
    }

    public function getUsers(){

        $professeurs = User::whereHas('role', function($query){
            $query->where('name', 'professeur');
        })->with('prof')->get();

        $eleves = User::whereHas('role', function($query){
            $query->where('name', 'eleve');
        })->with('eleve')->get();

        return response()->json([
            "success" => true,
            "data"=> [
                "professeurs"=> $professeurs,
                "eleves" => $eleves
            ]
            ]);
    }
}
