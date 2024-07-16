<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\IndividualGender;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('individuals', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->dateTime('birth_date');
            $table->enum('gender', IndividualGender::names());
            $table->enum('type', ['admin', 'individual']);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('individuals');
    }
};
