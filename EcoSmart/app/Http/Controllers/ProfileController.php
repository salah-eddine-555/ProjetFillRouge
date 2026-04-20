<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProfileProfFormRequest;
use App\Http\Requests\ProfileEleveFormRequest;
use App\Http\Requests\UpdateUserProfileRequest;
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
            'profile' => $user->prof
        ]);
    }

    public function storeProfileEleve(ProfileEleveFormRequest $request){
        
        $user = Auth::user();
        $this->service->createProfileEleve($request->validated());

        return response()->json([
            'success'=> true,
            'message'=> 'le profile eleve est ajouetr avec success',
            'profile' => $user->eleve
        ]);

    }

      public function updateProfile(UpdateUserProfileRequest $request)
    {
        $user = $this->service->UpdateProfileUser($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'profile updated with success',
            'data'=> [
                'firstname'=> $user->firstname,
                'lastname'=> $user->lastname,
                'email'=> $user->email,
                'adresse'=> $user->adresse,
                'role'=>$user->role->name,
                'profile'=> match($user->role->name){
                    'eleve'=> $user->eleve,
                    'professeur' => $user->prof,
                    default => null,
                }
            ],
               
        ]);
        
    }
}
