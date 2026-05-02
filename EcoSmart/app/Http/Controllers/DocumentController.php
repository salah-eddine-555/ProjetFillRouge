<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ServiceDocument;
use App\Http\Requests\DocumentRequest;
use App\Models\Cour;
use App\models\Document;

class DocumentController extends Controller
{
    private ServiceDocument $service;

    public function __construct(ServiceDocument $service){
        $this->service = $service;
    }

    public function getDocumentParCour(Cour $cour){

        $documents = $cour->documents;

        return response()->json([
            'success'=> true,
            'message' => 'les document pour ce cours',
            'data' => $documents,
        ]);
    }

    public function store(DocumentRequest $request,Cour $cour){

        $document = $this->service->create($cour, $request->validated());

        return response()->json([
            'success'=> true,
            'message'=> 'document est cree avec success',
            'data' => $document
        ]);

    }


     public function update(DocumentRequest $request, Document $document)
    {
        $updated = $this->service->update(
            $document,
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Document modifié avec succès',
            'data' => $updated
        ]);
    }

  
    public function destroy(Document $document)
    {
        $this->service->delete($document);

        return response()->json([
            'success' => true,
            'message' => 'Document supprimé avec succès'
        ]);
    }
}
