<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
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
            'email' =>  'required|email|max:255',
            'password'=> 'required|string|min:6|max:255',
        ];
    }
    public function messages(){
        return [
            'email.required'=> "email est oblegatoire",
            'email.email' => 'email invalide ',
            'email.string' => "email doit etre en format string",
            'password.min' => "password doit etre plus de 6 caractere",
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
