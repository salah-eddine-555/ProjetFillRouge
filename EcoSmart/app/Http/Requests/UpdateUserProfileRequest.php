<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProfileRequest extends FormRequest
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
            'firstname' => 'sometimes|string|max:255',
            'lastname'  => 'sometimes|string|max:255',
            'email'     => 'sometimes|email|unique:users,email,' . $this->user()->id,
            'adresse'   => 'sometimes|string|max:255',

    
            'Etat_professionelle' => 'required|in:Prof titulaire,Prof vacataire',
            'experiences' => 'sometimes|integer',

            'sex'          => 'sometimes|in:H,F',
            'number_parent'=> 'sometimes|string',
        ];
    }
}
