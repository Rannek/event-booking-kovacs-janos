<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Ellenőrzi, hogy a felhasználó be van-e jelentkezve, ÉS a szerepköre 'admin'.
        if (auth()->check() && auth()->user()->szerepkor === 'admin') {
            // Ha igen, továbbengedi a kérést a következő lépésre (a controllerre).
            return $next($request);
        }
        return response()->json(['uzenet' => 'Nincs jogosultsága a művelethez.'], 403);
    }
}
