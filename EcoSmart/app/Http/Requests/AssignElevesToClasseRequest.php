<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AssignElevesToClasseRequest extends FormRequest
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
            'classe_id'=> 'required|int|exists:classes,id',
            'eleves_ids'=> 'required|array|min:1',
            'eleves_ids.*'=> 'exists:profile_eleves,id'
        ];
    }

    public function messages(){
        return [
            'eleves_ids.*.exists' => 'il exist un ou plueurs elevs selection n est pas touvee',
            'classe_id.required' => 'le classe est oblegatoire',
            'eleves_ids.min' => "il faut selectioner au moins un eleve"  
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
