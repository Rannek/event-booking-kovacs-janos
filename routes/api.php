<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\EsemenyController;
use App\Http\Controllers\Api\V1\FoglalasController;
use App\Http\Controllers\Api\V1\Admin\AdminEsemenyController;
use App\Http\Controllers\Api\V1\Admin\RiportController;

// --- Autentikációs útvonalak (publikus) ---
    Route::post('/regisztracio', [AuthController::class, 'regisztracio']);
    Route::post('/bejelentkezes', [AuthController::class, 'bejelentkezes']);

// --- Publikus Esemény útvonalak ---
    Route::get('/esemenyek', [EsemenyController::class, 'index']);
    Route::get('/esemenyek/{esemeny}', [EsemenyController::class, 'show']);

// --- Védett útvonalak (bejelentkezés szükséges) ---
    Route::middleware('auth:sanctum')->group(function () {
    Route::post('/kijelentkezes', [AuthController::class, 'kijelentkezes']);
    Route::get('/profil', [AuthController::class, 'profil']);

    // Foglalások kezelése
    Route::post('/esemenyek/{esemeny}/foglalas', [FoglalasController::class, 'store']);
    Route::get('/sajat-foglalasok', [FoglalasController::class, 'index']);
    Route::delete('/foglalasok/{foglalas}', [FoglalasController::class, 'destroy']);
});

// --- Admin útvonalak ---
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::apiResource('esemenyek', AdminEsemenyController::class)->parameters([
        'esemenyek' => 'esemeny'
    ]);
    // Riportok
    Route::get('esemenyek/{esemeny}/resztvevok', [RiportController::class, 'resztvevok'])->name('esemenyek.resztvevok');
});
