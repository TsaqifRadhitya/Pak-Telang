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
        Schema::create('mitras', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->boolean('isOpen')->default(false);
            $table->string('namaUsaha')->unique();
            $table->string('fotoKTP');
            $table->string('NIK');
            $table->json('fotoDapur');
            $table->text('alasanPengajuan');
            $table->boolean('kulkas');
            $table->string('mou')->nullable();
            $table->string('address');
            $table->string('postalCode');
            $table->string('pesanPersetujuan')->nullable();
            $table->enum('statusPengajuan', ['Menunggu Persetujuan Formulir', 'Formulir disetujui', 'Formulir ditolak', 'Menunggu MOU', 'MOU disetujui', 'MOU ditolak']);
            $table->foreignUlid('districtId')->constrained('districts');
            $table->foreignUuid('userId')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mitras');
    }
};
