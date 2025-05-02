<?php

use App\Models\User;
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
        Schema::create('transaksis', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->integer('ongkir')->nullable();
            $table->string('resi')->nullable();
            $table->enum('status',['Menunggu Konfirmasi','Menunggu Pembayaran','Pembayaran Gagal','Pembayaran Berhasil','Sedang DiProses','Dalam Pengiriman','Selesai']);
            $table->foreignUlid('paymentId')->constrained('payments');
            $table->foreignUuid('customerId')->constrained('users');
            $table->foreignUuid('providerId')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
