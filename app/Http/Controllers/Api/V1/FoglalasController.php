<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoglalasResource;
use App\Models\Esemeny;
use App\Models\Foglalas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FoglalasController extends Controller
{
    /**
     * A bejelentkezett felhasználó saját foglalásainak listázása.
     */
    public function index(Request $request)
    {
        $foglalasok = $request->user()->foglalasok()->with('esemeny')->latest()->get();
        return FoglalasResource::collection($foglalasok);
    }

    /**
     * Új foglalás rögzítése egy eseményre.
     */
    public function store(Request $request, Esemeny $esemeny)
    {
        $validated = $request->validate([
            'helyek_szama' => 'required|integer|min:1',
        ]);
        $helyekSzama = $validated['helyek_szama'];

        if (Carbon::parse($esemeny->kezdes)->isPast()) {
            return response()->json(['uzenet' => 'Az esemény már elkezdődött, nem lehet rá foglalni.'], 400);
        }

        try {
            return DB::transaction(function () use ($esemeny, $helyekSzama) {
                $esemeny->refresh();

                if ($esemeny->elerheto_helyek_szama < $helyekSzama) {
                    return response()->json(['uzenet' => 'Nincs elég szabad hely.'], 409);
                }

                $foglalas = Foglalas::create([
                    'felhasznalo_id' => auth()->id(),
                    'esemeny_id' => $esemeny->id,
                    'helyek_szama' => $helyekSzama,
                ]);

                return new FoglalasResource($foglalas);
            }, 2);
        } catch (\Exception $e) {
            return response()->json(['uzenet' => 'Hiba történt a foglalás során.'], 500);
        }
    }

    /**
     * Egy meglévő foglalás törlése.
     */
    public function destroy(Foglalas $foglalas)
    {
        if (auth()->id() !== $foglalas->felhasznalo_id) {
            return response()->json(['uzenet' => 'Nincs jogosultsága a művelethez.'], 403);
        }

        if (Carbon::parse($foglalas->esemeny->kezdes)->isPast()) {
            return response()->json(['uzenet' => 'Az esemény már elkezdődött, a foglalás nem törölhető.'], 400);
        }

        $foglalas->delete();
        return response()->noContent();
    }
}
