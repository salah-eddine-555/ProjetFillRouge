<?php

namespace App\Services;
use App\Models\ProfileEleve;
use App\Models\ProfileProf;
use Illuminate\Support\Facades\Auth;


class ServiceProfile {


    public function createProfileProf($data){
            $user = Auth::user();

            return ProfileProf::create(array_merge(
                $data,
                ['user_id' =>$user->id]
            ));
    }

    public function createProfileEleve($data){
        
            $user = Auth::user();
            return ProfileEleve::create(array_merge(
                $data,
                ['user_id' => $user->id]
            ));
    }

    public function UpdateProfileUser($data){
        $user = Auth::user();

        if(isset($data['firstname'])){
            $user->firstname = $data['firstname'];
        }
        if(isset($data['lastname'])){
            $user->lastname = $data['lastname'];
        }
        if(isset($data['email'])){
            $user->email = $data['email'];
        }
        if(isset($data['adresse'])){
            $user->adresse = $data['adresse'];
        }

    $user->save();

      if ($user->role->name === 'professeur' && $user->prof) {

            if (isset($data['specialite'])) {
                $user->prof->specialite = $data['specialite'];
            }

            if (isset($data['experiences'])) {
                $user->prof->experiences = $data['experiences'];
            }

            $user->prof->save();
    }

    if($user->role->name === 'eleve' && $user->eleve){

          if (isset($data['sex'])) {
            $user->eleve->sex = $data['sex'];
        }

        if (isset($data['number_parent'])) {
            $user->eleve->number_parent = $data['number_parent'];
        }

        $user->eleve->save();
    }
     return $user->load(['prof', 'eleve']);

    }
}