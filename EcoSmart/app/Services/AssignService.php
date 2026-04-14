<?php
namespace App\Services;
use App\Models\Classe;
use App\Models\ProfileEleve;


class AssignService {


    public function AssingEleves($classe_id, $eleves_ids){

        $classe = Classe::findOrFail($classe_id);

        ProfileEleve::whereIn('id', $eleves_ids)
        ->update(['classe_id', $classe_id]);






    }

}