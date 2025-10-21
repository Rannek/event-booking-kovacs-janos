<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Felhasznalo extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'felhasznalok';

    protected $fillable = [
        'nev',
        'email',
        'jelszo',
        'szerepkor',
    ];

    protected $hidden = [
        'jelszo',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'jelszo' => 'hashed',
        ];
    }
    /**
     * Egy felhasználónak több foglalása lehet.
     */
    public function foglalasok()
    {
        return $this->hasMany(Foglalas::class, 'felhasznalo_id');
    }
}
