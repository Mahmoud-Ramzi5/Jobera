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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sender_id')->unsigned();
            $table->bigInteger('receiver_id')->unsigned();
            $table->bigInteger('job_id')->unsigned();
            $table->double('amount');
            $table->dateTime('date');
            $table->timestamps();

            $table->foreign('sender_id')->references('id')->on('wallets')->onDelete('cascade');
            $table->foreign('receiver_id')->references('id')->on('wallets')->onDelete('cascade');
            $table->foreign('job_id')->references('id')->on('freelancing_jobs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
