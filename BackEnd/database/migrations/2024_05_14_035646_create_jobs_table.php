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
        Schema::create('regJobs', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->foreignId("company_id")->constrained('companies');
            $table->text("description");
            $table->integer("salary");
            $table->enum("type", ['part', 'full']);
            $table->boolean("is_done");
            $table->foreignId('accepted_individual')->nullable()->constrained('individuals');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regJobs');
    }
};