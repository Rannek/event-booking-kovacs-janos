<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEsemenyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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
