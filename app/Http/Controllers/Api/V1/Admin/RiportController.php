<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Esemeny;
use Illuminate\Http\Request;

class RiportController extends Controller
{
    /**
     * Egy adott esemény résztvevőinek listázása.
     */
    public function resztvevok(Esemeny $esemeny)
    {
        // A 'with' betölti a felhasznalo relációt, elkerülve az N+1 lekérdezési problémát.
        // A ':id,nev,email' csak a szükséges oszlopokat kéri le.
        $resztvevok = $esemeny->foglalasok()
            ->with('felhasznalo:id,nev,email')
            ->get()
            ->map(function ($foglalas) {
                return [
                    'felhasznalo_nev' => $foglalas->felhasznalo->nev,
                    'felhasznalo_email' => $foglalas->felhasznalo->email,
                    'lefoglalt_helyek' => $foglalas->helyek_szama,
                    'foglalas_datuma' => $foglalas->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return response()->json($resztvevok);
    }
}
