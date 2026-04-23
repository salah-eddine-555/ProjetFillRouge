<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreClasseRequest extends FormRequest
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
            'name' => 'required|string|unique:classes,name|max:255',
            'niveau_id' => 'required|exists:niveaux,id',
            'prof_id' => 'nullable|exists:profile_professeurs,id',
        ];
    }

    public function messages(){
        return [
            'name.required'=> 'le nom de classes est oblegatoire ',
            'name.string' => 'le nom de classe de etre de type string',
            'name.unique' => 'ce nom de classes est deja existe ',

            'niveau_id.exists' => 'le niveau a choisit est introuvable',
            'niveau_id.required'=> 'il faut selectionee le niveau de classe est obleatoire',

            'prof_id.exists' =>  'le prof a selectionne est introuvable ',
        ];
    }

     public function failedValidation(Validator $validator){

        
        $errors = $validator->errors();
        $response = response()->json([
            'success'=> false,
            'message'=> 'erreur de validation',
            'errors' => $errors->messages(),
        ], 422);
        throw new HttpResponseException($response);
    }
}
