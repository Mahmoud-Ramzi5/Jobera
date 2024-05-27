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
            $table->string('title');
            $table->text('description');
            $table->float('min_salary');
            $table->float('max_salary');
            $table->dateTime('deadline');
            $table->boolean('is_done');
            $table->float('avg_salary')->default(0.0);
            $table->foreignId('user_id')->nullable();
            $table->foreignId('accepted_individual')->nullable()->constrained('individuals');
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
