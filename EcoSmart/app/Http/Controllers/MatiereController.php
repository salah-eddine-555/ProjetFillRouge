<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ServiceMatiere;
use App\Http\Requests\MatiereFormRequest;
use App\Models\Matiere;


class MatiereController extends Controller
{
    protected ServiceMatiere $service;

    public function __construct(ServiceMatiere $service){
        $this->service = $service;  
    }
    
    public function index(){
         $matieres =$this->service->getAll();
        return response()->json([
            'success' => true,
            'data'    => $matieres,
        ]);
    }

    public function store(MatiereFormRequest $request){
        $matiere = $this->service->create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Matière créée avec succès.',
            'data'    => $matiere,
        ], 201);

    }
    
    public function update(MatiereFormRequest $request, Matiere $matiere)   {
        $matiere = $this->service->modifier($matiere, $request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Matière modifiée avec supiccès.',
            'data'    => $matiere,
        ], 200);
    }

    public function destroy(Matiere $matiere){
        //supprimer matiere
         $this->service->supprimer($matiere);
        return response()->json([
            'success' => true,
            'message' => 'Matière supprimée avec succès.',
        ]);
    }
}
