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
        Schema::create('messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->text('message')->nullable();
            $table->json('image')->nullable();
            $table->boolean('isReaded')->default(false);
            $table->foreignUuid('from')->constrained('users')->onDelete('cascade');
            $table->foreignUuid('to')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
