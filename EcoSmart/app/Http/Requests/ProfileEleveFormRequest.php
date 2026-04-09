<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProfileEleveFormRequest extends FormRequest
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
               'sex'=> 'required|string|in:H,F',
            'number_parent' => 'sometimes|integer',
        ];
    }

    public function messages(){
        return [
            'sex.required'=> 'le sex est oblegere a saise !',
            'sex.in'=> 'le sex doit etre H ou F ',
            'number_parent.integer'=> 'le number tele doit etre entier',
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
