<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoglalasResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'foglalas_id' => $this->id,
            'lefoglalt_helyek' => $this->helyek_szama,
            'foglalas_datuma' => $this->created_at->format('Y-m-d H:i'),
            // Az 'esemeny' kulcs csak akkor jelenik meg a JSON-ben,
            // ha a relációt előzőleg betöltöttük a Controllerben a 'with()' metódussal.
            // Ez optimalizálja a lekérdezéseket.
            'esemeny' => new EsemenyResource($this->whenLoaded('esemeny')),
        ];
    }
}
