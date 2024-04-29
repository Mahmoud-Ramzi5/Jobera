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
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->enum("level", ['Bachelor','Master','PHD','High School Diploma','High Institute']);
            $table->string("field");
            $table->string("school");
            $table->dateTime("start_date");
            $table->dateTime("end_date");
            $table->foreignId("user_id")->constrained()->cascadeOnDelete();
            $table->string("certificate_file")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education');
    }
};
