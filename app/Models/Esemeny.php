<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Esemeny extends Model
{
    use HasFactory;

    protected $table = 'esemenyek';

    protected $fillable = [
        'cim', 'leiras', 'helyszin', 'kezdes', 'befejezes', 'max_ferohely'
    ];

    protected $casts = [
        'kezdes' => 'datetime',
        'befejezes' => 'datetime',
    ];

    /**
     * Egy eseményhez több foglalás tartozhat. (Egy a többhöz reláció)
     */
    public function foglalasok()
    {
        return $this->hasMany(Foglalas::class, 'esemeny_id');
    }

    /**
     * Accessor: Dinamikusan kiszámolja és elérhetővé teszi az 'elerheto_helyek_szama' attribútumot.
     */
    protected function elerhetoHelyekSzama(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->max_ferohely - $this->foglalasok()->sum('helyek_szama'),
        );
    }
}
