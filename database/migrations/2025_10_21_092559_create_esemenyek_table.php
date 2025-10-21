<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('esemenyek', function (Blueprint $table) {
            $table->id();
            $table->string('cim');
            $table->text('leiras');
            $table->string('helyszin');
            $table->dateTime('kezdes');
            $table->dateTime('befejezes');
            $table->unsignedInteger('max_ferohely');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('esemenyek');
    }
};
