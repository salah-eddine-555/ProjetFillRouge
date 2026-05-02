<?php
namespace App\Services;

use App\Models\Cour;
use App\Models\Document;

class ServiceDocument{

     public function create(Cour $cour, array $data){

            return $cour->documents()->create([
                'titre' => $data['titre'],
                'content' => $data['content'],
            ]);
    }

       public function update(Document $document, array $data)
    {
        $document->update([
            'titre' => $data['titre'] ?? $document->titre,
            'content' => $data['content'] ?? $document->content,
        ]);

        return $document;
    }

    public function delete(Document $document)
    {
        return $document->delete();
    }

    
    
}