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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("field");
            $table->string('email')->unique();
            $table->string('phoneNumber')->unique();
            $table->string('password')->nullable();
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->text("description")->nullable();
            $table->string('avatarPhoto')->nullable();
            $table->float('rating')->default(0.0)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
