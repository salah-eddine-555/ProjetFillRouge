<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProfileProfFormRequest;
use App\Http\Requests\ProfileEleveFormRequest;
use Illuminate\Support\Facades\Auth;
use App\Services\ServiceProfile;

class ProfileController extends Controller
{
    protected ServiceProfile $service;

    public function __construct(ServiceProfile $service){
        $this->service = $service;
    }
    
    public function storeProfileProf(ProfileProfFormRequest $request){
        $user = Auth::user();

        $this->service->createProfileProf($request->validated());

        return response()->json([
            'success'=> true,
            'message' => 'le profile prof est ajoutee ',
            'data' => $user->profileProf
        ]);
    }

    public function storeProfileEleve(ProfileEleveFormRequest $request){
        
        $user = Auth::user();
        $this->service->createProfileEleve($request->validated());

        return response()->json([
            'success'=> true,
            'message'=> 'le profile eleve est ajouetr avec success',
            'data' => $user->profileEleve
        ]);

    }

}
