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
        Schema::create('variants', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('variantName');
            $table->integer('variantPrice');
            $table->float('netto');
            $table->string('unit');
            $table->boolean('isDeleted')->default(false);
            $table->foreignUlid('productId')->constrained('products');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variants');
    }
};
