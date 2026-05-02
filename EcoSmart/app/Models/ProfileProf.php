<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Classe;
class ProfileProf extends Model
{
    protected $table = 'profile_professeurs';

    protected $fillable = ['Etat_professionelle', 'experiences', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function classes(){
        return $this->hasMany(Classe::class, 'prof_id');
    }

    public function cours(){
        return $this->hasMany(Cour::class, 'prof_id');
    }
}
