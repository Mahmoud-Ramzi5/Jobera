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
            $table->dateTime("deadline");
            $table->string("title");
            $table->foreignId("company_id")->nullable();
            $table->foreignId("user_id")->nullable();
            $table->text("description");
            $table->integer("max_salary");
            $table->integer("min_salary");
            $table->boolean("isDone");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freelancing_jobs');
    }
};
