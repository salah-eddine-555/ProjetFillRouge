<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AssignService;
use App\Models\Classe;

use App\Http\Requests\AssignElevesToClasseRequest;

class AssingController extends Controller
{
    protected AssignService $service;

    public function __construct(){
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
}
