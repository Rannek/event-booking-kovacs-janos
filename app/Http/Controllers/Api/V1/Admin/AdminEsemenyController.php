<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEsemenyRequest;
use App\Http\Requests\UpdateEsemenyRequest;
use App\Http\Resources\EsemenyResource;
use App\Models\Esemeny;

class AdminEsemenyController extends Controller
{
    /**
     * Az összes esemény listázása (nincs időbeli korlát).
     */
    public function index()
    {
        return EsemenyResource::collection(Esemeny::orderBy('kezdes', 'desc')->get());
    }

    /**
     * Új esemény létrehozása.
     */
    public function store(StoreEsemenyRequest $request)
    {
        $esemeny = Esemeny::create($request->validated());
        return new EsemenyResource($esemeny);
    }

    /**
     * Egy esemény megjelenítése.
     */
    public function show(Esemeny $esemeny)
    {
        return new EsemenyResource($esemeny);
    }

    /**
     * Egy meglévő esemény frissítése.
     */
    public function update(UpdateEsemenyRequest $request, Esemeny $esemeny)
    {
        $esemeny->update($request->validated());
        return new EsemenyResource($esemeny->fresh());
    }

    /**
     * Egy esemény törlése.
     */
    public function destroy(Esemeny $esemeny)
    {
        $esemeny->delete();
        return response()->noContent();
    }
}
