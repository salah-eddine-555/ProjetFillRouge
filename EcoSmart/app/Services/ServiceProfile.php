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
}