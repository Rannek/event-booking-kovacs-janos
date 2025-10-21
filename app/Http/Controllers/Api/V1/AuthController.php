<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Felhasznalo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    /**
     * Új felhasználó regisztrálása.
     */
    public function regisztracio(Request $request): JsonResponse
    {
        $request->validate([
            'nev' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:felhasznalok'],
            'jelszo' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $felhasznalo = Felhasznalo::create([
            'nev' => $request->nev,
            'email' => $request->email,
            'jelszo' => $request->jelszo,
        ]);

        return response()->json([
            'uzenet' => 'Sikeres regisztráció!',
            'felhasznalo' => $felhasznalo
        ], 201);
    }

    /**
     * Felhasználó bejelentkeztetése és API token generálása.
     */
    public function bejelentkezes(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'jelszo' => ['required'],
        ]);

        $felhasznalo = Felhasznalo::where('email', $credentials['email'])->first();

        // JAVÍTÁS: A 'Hash' osztályt a 'use' utasítással használjuk, nincs szükség teljes névtérre.
        if (! $felhasznalo || ! Hash::check($credentials['jelszo'], $felhasznalo->jelszo)) {
            return response()->json(['uzenet' => 'Hibás bejelentkezési adatok.'], 401);
        }

        $token = $felhasznalo->createToken('api-token-'. $felhasznalo->nev)->plainTextToken;
        return response()->json(['token' => $token]);
    }

    /**
     * Felhasználó kijelentkeztetése (aktuális token érvénytelenítése).
     */
    public function kijelentkezes(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['uzenet' => 'Sikeres kijelentkezés.']);
    }

    /**
     * A bejelentkezett felhasználó adatainak lekérése.
     */
    public function profil(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}
