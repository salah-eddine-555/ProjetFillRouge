<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Token;

class TokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $tokenValue = $request->header('Authorization');

        $token = Token::where('token', $tokenValue)->first();

        if (!$token) {
        return response()->json(['message' => 'Unauthorized'], 401);
        }

        auth()->login($token->user);
        return $next($request);
    }
}
