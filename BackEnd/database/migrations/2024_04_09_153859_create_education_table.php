<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\EducationLevel;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->enum("level", EducationLevel::names());
            $table->string("field");
            $table->string("school");
            $table->dateTime("start_date");
            $table->dateTime("end_date");
            $table->foreignId("individual_id")->constrained()->cascadeOnDelete();
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
