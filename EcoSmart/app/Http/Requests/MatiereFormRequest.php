<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MatiereFormRequest extends FormRequest
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
            'name'=> 'required|string|max:255|unique:matieres,name,' . $this->matiere?->id,
        ];
    }

    public function messages(){
        return [
            'name.required'=> 'le nom de matiere est oblegatoire !',
            'name.unique' => 'cette matiere est deja existe'
        ];
    }

    public function failedValidation(Validator $validator){
        
    }
}
