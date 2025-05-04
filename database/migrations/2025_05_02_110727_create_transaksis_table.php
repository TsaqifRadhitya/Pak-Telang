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
            $table->string('snapToken')->nullable();
            $table->integer('ongkir')->nullable();
            $table->string('metodePengiriman')->default('delivery');
            $table->string('resi')->nullable();
            $table->enum('type',['Barang jadi','Bahan Baku']);
            $table->enum('status',['Menunggu Konfirmasi','Menunggu Pembayaran',"Gagal Menemukan Provider",'Pembayaran Berhasil','Sedang DiProses','Dalam Pengiriman','Selesai']);
            $table->string('address');
            $table->string('postalCode');
            $table->foreignUlid('districtId')->constrained('districts');
            $table->foreignUlid('paymentId')->nullable()->constrained('payments');
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
