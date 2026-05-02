<?php
namespace App\Services;
use App\Models\Cour;
use App\Models\Classe;

class ServiceCour {

     public function create(array $data)
    {
        return Cour::create($data);
    }

    // ASSIGN CLASSES
   public function assignClasse(Cour $cour, $classeId)
        {
           
            $cour->load('classes');
        
            $classe = Classe::findOrFail($classeId);
        
         
            if ($cour->classes->count() > 0) {
        
                $niveauReference = $cour->classes->first()->niveau_id;
        
                if ($classe->niveau_id != $niveauReference) {
                    throw new \Exception("ce cour ne corresponde pas le niveau de ce classe ");
                }
            }
            $cour->classes()->syncWithoutDetaching([$classeId]);
        
            return $cour;
        }

}