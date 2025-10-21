<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foglalas extends Model
{
    use HasFactory;

    protected $table = 'foglalasok';

    protected $fillable = [
        'felhasznalo_id', 'esemeny_id', 'helyek_szama'
    ];

    /**
     * Egy foglalás egy felhasználóhoz tartozik.
     */
    public function felhasznalo()
    {
        return $this->belongsTo(Felhasznalo::class, 'felhasznalo_id');
    }

    /**
     * Egy foglalás egy eseményhez tartozik.
     */
    public function esemeny()
    {
        return $this->belongsTo(Esemeny::class, 'esemeny_id');
    }
}
