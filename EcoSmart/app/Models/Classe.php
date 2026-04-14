<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProfileEleve;
use App\Models\ProfileProf;
use App\Models\Niveau;


class Classe extends Model
{
    protected $fillable = ['name', 'niveau_id'];


    public function niveau(){
        return $this->belongsTo(Niveau::class);
    }

    public function eleves(){
        return $this->hasMany(ProfileEleve::class);
    }


    public function prof(){
        return $this->belongsTo(ProfileProf::class, 'prof_id');
    }
}
