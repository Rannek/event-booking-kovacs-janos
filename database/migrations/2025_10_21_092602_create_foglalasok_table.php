<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('foglalasok', function (Blueprint $table) {
        $table->id();
        $table->foreignId('felhasznalo_id')->constrained('felhasznalok')->onDelete('cascade');
        $table->foreignId('esemeny_id')->constrained('esemenyek')->onDelete('cascade');
        $table->unsignedInteger('helyek_szama');
        $table->timestamps();
        $table->unique(['felhasznalo_id', 'esemeny_id']);
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foglalasok');
    }
};
