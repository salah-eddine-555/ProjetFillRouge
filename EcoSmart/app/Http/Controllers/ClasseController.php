<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classe;
use App\Services\ClassService;
use App\Http\Requests\StoreClasseRequest;
use App\Http\Requests\UpdateClasseRequest;

class ClasseController extends Controller
{
    protected ClassService $service;

    public function __construct(ClassService $service){
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $classes = $this->service->getAll();

       return response()->json([
        'success'=> true,
        'message'=> 'les classes est recupere avec success',
        'data' => $classes,
       ], 200);
    }

   
    public function store(StoreClasseRequest $request)
    {
        $classe = $this->service->create($request->validated());

        return response()->json([
            'success'=> true,
            'message' => "le classe est cree",
            'data' => $classe,
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classe $classe)
    {
        
        $classe = $this->service->getById($classe->id);

        return response()->json([
            'success' => true,
            'message' => 'Détails de la classe',
            'data' => $classe
        ]);
    }

    public function update(UpdateClasseRequest $request,Classe $classe)
    {
        $classe = $this->service->modifier($request->validated(), $classe);

        return response()->json([
            'success'=> true,
            'message'=> 'le classe est modifer avec success',
            'data' => $classe,
        ]);
    }

    
    public function destroy(Classe $classe)
    {
        $this->service->delete($classe);

        return response()->json([
            'success'=> true,
            'message'=> 'cette classe ete supprimer avec success',
        ]);
    }
}
