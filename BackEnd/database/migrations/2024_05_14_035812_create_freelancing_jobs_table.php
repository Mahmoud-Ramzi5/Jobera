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
            $table->double('min_salary');
            $table->double('max_salary');
            $table->dateTime('deadline');
            $table->double('avg_salary')->default(0.0);
            $table->foreignId('user_id')->nullable();
            $table->foreignId('defJob_id')->constrained('def_jobs')->cascadeOnDelete();
            $table->foreignId('accepted_user')->nullable()->constrained('users');
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
