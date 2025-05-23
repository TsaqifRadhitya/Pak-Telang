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
        Schema::create('donasis', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->integer('nominal');
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('pesan')->nullable();
            $table->enum('status', ['pending', 'paid', 'failed'])->default('pending');
            $table->string('snapToken')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donasis');
    }
};
