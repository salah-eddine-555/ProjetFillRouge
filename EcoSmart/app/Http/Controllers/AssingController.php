<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AssignService;
use App\Models\Classe;
use App\Models\ProfileEleve;
use App\Models\User;
use App\Models\ProfileProf;

use App\Http\Requests\AssignElevesToClasseRequest;

class AssingController extends Controller
{
    protected AssignService $service;

    public function __construct(AssignService $service){
        $this->service = $service;
    }

    public function AssingEelevsToClasse(AssignElevesToClasseRequest $request){

        $result = $this->service->AssingEleves($request->classe_id, $request->eleves_ids);

        return response()->json([
            'success'=> true,
            'message'=> $result['message'],
            'data' => $result,
        ], 200);
    }

    public function getElevesNonAssigne(){

        $eleves = ProfileEleve::whereNull('classe_id')->with('user')->get();

        return response()->json([
            'success'=> true,
            'data' => $eleves
        ]);
    }

    public function getProfesseurs(){

        $profs = ProfileProf::with('user')->get();

        return response()->json([
            'data' => $profs
        ]);
    }

    public function AssigneProfToClasse(Request $request){

        $data = $request->validate([
            'classe_id' => 'required|exists:classes,id',
            'prof_id' => 'required|exists:profile_professeurs,id',
        ]);
        // dd($data);

        $classe = $this->service->assigneProf($data);

        return response()->json([
            'success'=> true,
            'message' => 'le prof a assigne a ce classe',
            'data' => $classe->load('prof.user'),
        ]);
    }

    public function RetireEleveFromClasse(Request $request){

        $data  = $request->validate([
            'classe_id' => 'required|exists:classes,id',
            'eleve_id' => 'required|exists:profile_eleves,id',
        ]);

        $result = $this->service->RetirerELeve($data);

        if(!$result){
            return response()->json([
                'success'=> false,
                'message' => 'cette eleves n appartient a cette classe'
            ], 400);
        }
        
        return response()->json([
            'success'=> true,
            'message' => 'cette eleve est retiree avec succe',
        ]);
        
       
    }
}
