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
        Schema::create('classs', function (Blueprint $table) {
            $table->id();
            $table->string('className')->unique();
            $table->foreignId('course')->constrained();
            $table->foreignId('filiere_id')->constrained();
            $table->foreignId('teacher_id')->constrained();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classs');
    }
};