<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Models\Token;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){

        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        $token = $user->tokens()->create([
            'token'=>Str::random(60),
        ]);

        return response()->json([
            'message'=> 'register avec success ',
            'token'=> $token->token,
        ]);
    }


    public function login(LoginRequest $request){

        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json(['message'=> 'email ou mote de passe incorrect'], 401);
        };

        $token = $user->tokens()->create([
            'token'=>Str::random(60),
        ]);

        return response()->json([
            'message'=>'connexion reussie',
            'token'=> $token->token
        ]);

    }

    public function logout(Request $request){
        $tokenValue = $request->header('Authorization');

        $token = Token::where('token', $tokenValue)->first();
        
        if(!$token){
            return response()->json(['message'=> 'Unauthorized'], 401);
        }
        $token->delete();

        return response()->json(['message'=> 'loggout success']);
    }

}
