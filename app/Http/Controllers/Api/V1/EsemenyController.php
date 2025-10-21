<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\EsemenyResource;
use App\Models\Esemeny;
use Illuminate\Http\Request;

class EsemenyController extends Controller
{
    /**
     * A jövőbeli események listázása, időrendben.
     */
    public function index()
    {
        $esemenyek = Esemeny::where('kezdes', '>=', now())->orderBy('kezdes', 'asc')->get();
        return EsemenyResource::collection($esemenyek);
    }

    public function show(Esemeny $esemeny)
    {
        return new EsemenyResource($esemeny);
    }
}
