<?php
namespace App\Services;
use App\Models\Matiere;

class ServiceMatiere {


    public function getAll(){
         return Matiere::all();
    }

    public function create($data){
        return Matiere::create($data);
    }

    public function modifier(Matiere $matiere, array $data):Matiere {
        // modifier matiere
        $matiere->update($data);
        return $matiere;    
    }

    public function supprimer(Matiere $matiere):bool{
        return $matiere->delete();
    }
}