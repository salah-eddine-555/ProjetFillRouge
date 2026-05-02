<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourRequest extends FormRequest
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
            'description' => 'required|string',
            'date' => 'required|date',
            'mass_horaire' => 'required|integer|min:1',
            'matiere_id' => 'required|exists:matieres,id',
            'document_id' => 'nullable|exists:documents,id',
        ];
    }

    public function messages(): array
    {
        return [
            'titre.required' => 'Le titre est obligatoire',
            'date.required' => 'La date est obligatoire',
            'mass_horaire.required' => 'La durée est obligatoire',
        ];
    }

}
