<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEsemenyRequest extends FormRequest
{
    /**
     * Meghatározza, hogy a felhasználó jogosult-e végrehajtani ezt a kérést.
     */
    public function authorize(): bool
    {
        // A jogosultságot már a middleware kezeli, itt engedélyezhetjük.
        return true;
    }

    /**
     * A kérésre vonatkozó validációs szabályok.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cim' => 'required|string|max:255',
            'leiras' => 'required|string',
            'helyszin' => 'required|string|max:255',
            'kezdes' => 'required|date|after:now',
            'befejezes' => 'required|date|after:kezdes',
            'max_ferohely' => 'required|integer|min:1',
        ];
    }
}
