<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DocumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
             'titre' => 'required|string|max:255',
            'content' => 'required|string',
            'cour_id' => 'required|exists:cours,id',
        ];
    }

    public function messages(){
        return [
               'titre.required' => 'Le titre est obligatoire.',
                'titre.string' => 'Le titre doit être une chaîne de caractères.',
                'titre.max' => 'Le titre ne doit pas dépasser 255 caractères.',
        
                'content.required' => 'Le contenu est obligatoire.',
                'content.string' => 'Le contenu doit être un texte.',
        
                'cour_id.required' => 'Le cours est obligatoire.',
                'cour_id.exists' => 'Le cours sélectionné est invalide.',
        ];
    }
}
