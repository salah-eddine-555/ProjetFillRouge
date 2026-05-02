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
         Schema::table('cours', function (Blueprint $table) {

        $table->dropColumn(['date_debut', 'date_fin']);

        $table->date('date')->after('description');

        $table->integer('mass_horaire')->after('date');

        $table->foreignId('matiere_id')
              ->constrained()
              ->onDelete('cascade');

        $table->foreignId('document_id')
              ->nullable()
              ->constrained();
              
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
