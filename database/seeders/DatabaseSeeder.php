<?php

namespace Database\Seeders;

use App\Models\Esemeny;
use App\Models\Felhasznalo;
use App\Models\Foglalas;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        Foglalas::truncate();
        Esemeny::truncate();
        Felhasznalo::truncate();

        Schema::enableForeignKeyConstraints();

        Felhasznalo::create([
            'nev' => 'Adminisztrátor',
            'email' => 'admin@teszt.hu',
            'jelszo' => Hash::make('admin123'),
            'szerepkor' => 'admin',
        ]);

        Felhasznalo::create([
            'nev' => 'Teszt Felhasználó',
            'email' => 'user@teszt.hu',
            'jelszo' => Hash::make('user123'),
            'szerepkor' => 'felhasznalo',
        ]);
        Felhasznalo::factory(5)->create();

        Esemeny::factory(15)->create();
    }
}
