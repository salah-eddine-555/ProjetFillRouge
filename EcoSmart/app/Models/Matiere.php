<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Cour;

class Matiere extends Model
{
  
    protected $fillable = ['name'];


    public function cours(){
        return $this->hasMany(Cour::class);
    }
}
