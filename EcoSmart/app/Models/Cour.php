<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Matiere;
use App\Models\ProfileProf;
use App\Models\Classe;
use App\Models\Document;


class Cour extends Model
{
    protected $fillable = ['titre', 'description','date', 'mass_horaire', 'prof_id', 'matiere_id'];

    public function matiere(){
        return $this->belongsTo(Matiere::class);
    }

    public function prof(){
        return $this->belongsTo(ProfileProf::class , 'prof_id');
    }

    public function classes(){
        return $this->belongsToMany(Classe::class, 'classe_cours');
    }

    public function documents(){
        return $this->hasMany(Document::class);
    }

    
}
