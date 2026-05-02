<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProfileProfFormRequest extends FormRequest
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
            'Etat_professionelle' => 'required|in:Prof titulaire,Prof vacataire',
            'experiences' => 'required|integer',
        ];
    }
    public function messages(){
        return [
            'Etat_professionelle.required' =>' le specialite est oblegee',
            'experiences.required'  => "L'expérience est obligatoire.",
            'experiences.integer' => 'l expreince doit etre entie ',
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
