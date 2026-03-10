<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClasseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('classes')->insert([
            ['name'=> 'class1', 'niveau_id'=> 1],
            ['name'=> 'class2', 'niveau_id'=> 1],
            ['name'=> 'class3', 'niveau_id'=> 2],
            ['name'=> 'class4', 'niveau_id'=> 2],
        ]);
    }
}
