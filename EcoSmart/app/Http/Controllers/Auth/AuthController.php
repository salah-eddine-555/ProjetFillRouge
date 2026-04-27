<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){

        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success'=> true,
            'message'=> 'register avec success ',
            'data'=> [
                'firstname'=> $user->firstname,
                'lastname'=> $user->lastname,
                'email'=> $user->email,
                'adresse'=> $user->adresse,
                'role'=>$user->role->name,
                'profile'=> match($user->role->name){
                    'eleve'=> $user->eleve,
                    'professeur' => $user->prof,
                    default => null,
                }
            ],
            'token'=> $token,
        ]);
    }


    public function login(LoginRequest $request){

        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json(['message'=> 'email ou mote de passe incorrect'], 401);
        };

        if(!$user->is_active){
            return response()->json([
                'success'=> false,
                'message' => 'ce compte est desactive par administration '
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success'=> true,
            'message'=>'connexion reussie',
            'data'=> [
                'firstname'=> $user->firstname,
                'lastname'=> $user->lastname,
                'email'=> $user->email,
                'adresse'=> $user->adresse,
                'role'=>$user->role->name,
                'profile'=> match($user->role->name){
                    'eleve'=> $user->eleve,
                    'professeur' => $user->prof,
                    default => null,
                }
            ],
            'token'=> $token
        ]);

    }

    public function logout(Request $request){
        
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'success'=> false,
                'message'=> 'Utilisateur non authentife'
            ], 401);
        }
        $user->currentAccessToken()->delete();

         return response()->json([
            'success'=> true,
            'message'=> "deconnexion avec reussie ",
        ]);
    }
}
