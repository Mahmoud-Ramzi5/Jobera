<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\RegJobTypes;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reg_jobs', function (Blueprint $table) {
            $table->id();
            $table->decimal('salary', 19, 4);
            $table->enum('type', RegJobTypes::names());
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->foreignId('defJob_id')->constrained('def_jobs')->cascadeOnDelete();
            $table->foreignId('accepted_individual')->nullable()->constrained('individuals')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reg_jobs');
    }
};
