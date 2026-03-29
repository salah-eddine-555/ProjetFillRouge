<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\NiveauRequest;
use App\Services\ServiceNiveau;
use App\Models\Niveau;

class NiveauController extends Controller
{   
    protected ServiceNiveau $service;

    public function __construct(ServiceNiveau $service){
        $this->service = $service;
    }
    
    public function index(){

        $niveaux  = $this->service->getAll();
        return response()->json([
            'success'=> true,
            'message'=> 'les niveaux est recupere avec success',
            'data' => $niveaux,
        ]);
    }

    public function store(NiveauRequest $request){
        
        $niveau = $this->service->create($request->validated());

        return response()->json([
            'success'=> true,
            'messgae'=> 'cette niveau ajoutee avec success',
            'data'=> $niveau->name,
        ], 201);
    }

    public function update(NiveauRequest $request,Niveau $niveau){
        
        $niveau = $this->service->modifier($niveau, $request->validated());

        return response()->json([
            'success'=> true,
            'message'=> 'le niveau est midifer avec success',
            'data' => $niveau->name,
        ]);
    }

    public function destroy(Niveau $niveau){
        $this->service->supprimer($niveau);

        return response()->json([
            'success'=> true,
            'message'=> 'ce niveau est supprimee avec succees',
        ]);
    }
}
