<?php
namespace App\Services;
use App\Models\Classe;
use App\Models\ProfileEleve;


class AssignService {


    public function AssingEleves($classe_id, $eleves_ids): array {

        $classe = Classe::findOrFail($classe_id);

        ProfileEleve::whereIn('id', $eleves_ids)
        ->update(['classe_id'=> $classe_id]);

        return [
            'message'=> 'l eleve est assigne avec success',
            'classe' => $classe
        ];
    }

    public function assigneProf(array $data) : Classe {

        $classe = Classe::findOrFail($data['classe_id']);
    
        $classe->prof_id = $data['prof_id'];
        $classe->save();
    
        return $classe;

    }

    public function RetirerELeve(array $data) : bool {

        $eleve = ProfileEleve::find($data['eleve_id']);

        if(!$eleve || $eleve->classe_id != $data['classe_id']){
            return false;
        }

        $eleve->classe_id = null;
        $eleve->save();

        return true;
    }

}