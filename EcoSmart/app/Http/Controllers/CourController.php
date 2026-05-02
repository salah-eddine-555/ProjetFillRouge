<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ServiceCour;
use App\Http\Requests\StoreCourRequest;
use App\Models\Classe;
use App\Models\Cour;
use Illuminate\Support\Facades\Auth;

class CourController extends Controller
{
    private ServiceCour $service;

    public function __construct(ServiceCour $service){
        $this->service = $service;
    }

     public function index()
    {
        $cours = Cours::with(['matiere', 'classes'])->get();

        return response()->json([
            'success' => true,
            'data' => $cours
        ]);
    }

     public function store(StoreCourRequest $request)
    {
        $data = $request->validated();

        $prof = auth()->user()->prof;
        $data['prof_id'] = $prof->id;

        $cours = $this->service->create($data);


        return response()->json([
            'success' => true,
            'message' => 'Cours créé avec succès',
            'data' => $cours
        ]);
    }

    public function show(Cour $cour)
    {
   
        $cour->load(['matiere', 'classes.niveau'])->loadCount('documents');

        return response()->json([
            'success' => true,
            'data' => $cour
        ]);
    }

    public function getCourParProf(){

        $prof = Auth::user()->prof;

        $cours = $prof->cours;
    

        return response()->json([
            'success'=> true,
            'data' => $cours->load('matiere'),
        ]);

    }

     public function assignClasseToCours(Request $request,Cour $cour)
        {
            $request->validate([
                'classe_id' => 'required|exists:classes,id'
            ]);
        
            try {
                $cours = $this->service->assignClasse($cour, $request->classe_id);
        
                return response()->json([
                    'success' => true,
                    'message' => 'Cours assigné avec succès',
                    'data' => $cours->load('classes')
                ]);
        
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 400);
            }
        }

        public function CourParClasse(Classe $classe){
           $cours = $classe->cours;

           return response()->json([
            'success'=> true,
            'message'=> 'les cour pour ce classe',
            'data' => $cours
           ]);

        }
}
