<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create(
            'exams',
            function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('description');
                $table->foreignId('teacher_id')->constrained();
                $table->foreignId('classe_id')->constrained();
                $table->foreignId('salle_id')->constrained();
                $table->dateTime('start_date');
                $table->dateTime('end_date');
                $table->timestamps();
                $table->softDeletes();
            }
        );
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
