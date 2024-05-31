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
        Schema::create('reg_job_skill', function (Blueprint $table) {
            $table->id();
            $table->foreignId("skill_id")->constrained()->cascadeOnDelete();
            $table->foreignId("job_id")->constrained("reg_jobs")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reg_job_skill');
    }
};
