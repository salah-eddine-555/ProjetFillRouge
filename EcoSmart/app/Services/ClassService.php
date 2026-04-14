<?php
namespace App\Services;

use App\Models\Classe;

class ClassService {
    public function getAll(){
        return Classe::with('niveau', 'prof')->get();
    }
    public function create($data){
    $classe = Classe::create($data);
    return $classe;
    }
    
    public function modifier($data, $classe){
         $classe->update($data);
         return $classe;
    }
    public function getById($id){
        $classe = Classe::findOrFail($id);
        return $classe;
    }
    public function delete($classe){
    $classe = Classe::findOrFail($classe->id);
    return $classe->delete();
    }
    
}