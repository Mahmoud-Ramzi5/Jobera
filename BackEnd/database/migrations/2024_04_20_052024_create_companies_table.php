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
            $table->string('phone_number')->unique();
            $table->string('password')->nullable();
            $table->bigInteger('state_id')->unsigned();
            $table->text("description")->nullable();
            $table->string('avatar_photo')->nullable();
            $table->float('rating')->default(0.0)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();

            $table->foreign('state_id')->references('state_id')->on('states')->onDelete('cascade');
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
