<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProfileEleve;
use App\Models\Cour;

class StatistiqueProfController extends Controller
{
    public function Statistiques(){
        $user = auth()->user();

        $prof = $user->prof;

        $totalClasses = $prof->classes()->count();
        $totalEeves = ProfileEleve::whereIn('classe_id', $prof->classes()->pluck('id'))->count();

        $totalCours = $prof->cours()->count();

            return response()->json([
                'success'=> true,
                'data' => [
                    'totalClasses'=> $totalClasses,
                    'totalEleves' => $totalEeves
                ]
            ]);
    }
}
