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
          Schema::table('profile_professeurs', function (Blueprint $table) {

        
            $table->dropColumn('specialite');

       
            $table->enum('Etat_professionelle', ['Prof titulaire', 'Prof vacataire'])
                  ->default('Prof titulaire')
                  ->after('experiences');
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
