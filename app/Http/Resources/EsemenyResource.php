<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EsemenyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cim' => $this->cim,
            'leiras' => $this->leiras,
            'helyszin' => $this->helyszin,
            'kezdes' => $this->kezdes->format('Y. F j., H:i'),
            'befejezes' => $this->befejezes->format('Y. F j., H:i'),
            'max_ferohely' => $this->max_ferohely,
            'elerheto_helyek' => $this->elerheto_helyek_szama,
        ];
    }
}
