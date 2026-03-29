<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Classe;

class Niveau extends Model
{
    protected $fillable = ['name'];

    public function classes(){
        return $this->hasMany(Classe::class);
    }
}
