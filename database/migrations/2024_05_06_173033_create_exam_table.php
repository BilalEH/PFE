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
                // Primary key
                $table->string('title');
                // Exam title
                $table->string('description');
                // Exam description
                $table->foreignId('teacher_id')->constrained();
                // Foreign key to teachers
                $table->foreignId('course_id')->constrained();
                // Foreign key to courses
                $table->foreignId('class_id')->constrained();
                $table->foreignId('salle_id')->constrained();
                // Foreign key to classes
                $table->dateTime('start_date');
                $table->dateTime('end_date');
                $table->timestamps();
                // Timestamps
                $table->softDeletes();
                // Soft delete
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
