<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class UpdateClasseRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'niveau_id' => 'sometimes|exists:niveaux,id',
            'prof_id' => 'sometimes|nullable|exists:profile_professeurs,id',
        ];
    }
    public function messages(){
        return [
            'name.string' => 'le nom de classe de etre de type string',
            'niveau_id.exists' => 'le niveau a choisit est introuvable',
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