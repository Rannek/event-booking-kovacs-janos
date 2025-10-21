<?php

namespace Database\Factories;

use App\Models\Felhasznalo;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class FelhasznaloFactory extends Factory
{
    protected $model = Felhasznalo::class;
    protected static ?string $jelszo;

    public function definition(): array
    {
        return [
            'nev' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'jelszo' => static::$jelszo ??= Hash::make('password'),
            'szerepkor' => 'felhasznalo',
            'remember_token' => Str::random(10),
        ];
    }
}
