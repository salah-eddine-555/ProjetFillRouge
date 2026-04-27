<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Matiere;
use App\Models\ProfileProf;


class Cour extends Model
{
    protected $fillable = ['titre', 'description','date_debut', 'date_fin'];

    public function matiere(){
        return $this->belongsTo(Matiere::class);
    }

    public function prof(){
        return $this->belongsToMany(ProfileProf::class , 'prof_id');
    }
}
