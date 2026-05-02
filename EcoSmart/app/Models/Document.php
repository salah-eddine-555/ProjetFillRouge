<?php

namespace App\Models;
use App\Models\Cour;
use App\Models\Image;


use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = ['titre', 'content', 'cour_id'];

    public function cour(){
        return $this->belongsTo(Cour::class);
    }

    public function images(){
        return $this->hasMany(Image::class);
    }
}
