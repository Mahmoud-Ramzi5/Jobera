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
        Schema::create('freelancing_jobs', function (Blueprint $table) {
            $table->id();
            $table->dateTime('deadline');
            $table->decimal('min_salary', 19, 4);
            $table->decimal('max_salary', 19, 4);
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('defJob_id')->constrained('def_jobs')->cascadeOnDelete();
            $table->foreignId('accepted_user')->nullable()->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
        // Set the default value of avgSalary to max_salary
        // DB::statement("ALTER TABLE freelancing_jobs ALTER COLUMN avgSalary SET DEFAULT max_salary");
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancing_jobs');
    }
};
