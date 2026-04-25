<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateStatutFormRequest;
use App\Services\UserService;

class UserController extends Controller
{
    private UserService $service;

    public function __construct(UserService $service){
        $this->service = $service;
    }

    
    public function  UpdateStatutUser(UpdateStatutFormRequest $request){

        $result = $this->service->UpdateStatut($request->validated());

        if(!$result){
            return response()->json([
                'success'=> false,
                'message'=> 'cette user est introuvable'
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'le changement de staut ce fait en reussie'
        ]);
    }

  
}
