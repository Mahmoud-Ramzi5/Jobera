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
        Schema::create('individuals', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->dateTime('birth_date');
            $table->enum('gender', ['male', 'female']);
            $table->enum('type', ['admin', 'indvidual']);
            $table->text('description')->nullable();
            $table->string('avatar_photo')->nullable();
            $table->float('rating')->default(0.0)->nullable();
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
