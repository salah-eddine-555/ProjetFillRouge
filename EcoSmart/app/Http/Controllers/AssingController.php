<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AssignService;
use App\Models\Classe;
use App\Models\ProfileEleve;
use App\Models\User;

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

        $user = User::with('prof')->get();

        return response()->json([
            'data' =>  $user
        ]);
    }

    public function assigneProfToClasse(Request $request){

        $request->validate([
            'classe_id' => 'required|exists:classes,id',
            'prof_id' => 'required|exists:profile_professeurs,id',
        ]);
        $classe = Classe::findOrFail($request->classe_id);

        $classe->prof_id = $request->prof_id;
        $classe->save();
        return response()->json([
            'success'=> true,
            'message' => 'le prof a assigne a ce classe',
            'data' => $classe->load('prof'),
        ]);
    }
}
