<?php

namespace App\Services;
use App\Models\Niveau;



class ServiceNiveau {
    
    public function getAll(){
        return Niveau::all();
    }
    public function create(array $data): Niveau {
        return Niveau::create($data);
    }
    public function modifier(Niveau $niveau, array $data){
        $niveau->update($data);
        return $niveau;
    }
    public function supprimer(Niveau $niveau){
        if($niveau->classes()->exists()){
            throw new \Exception("cette niveaux a des classes");
        }
        $niveau->delete();
        return true;
    }
}