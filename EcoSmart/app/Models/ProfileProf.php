<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileProf extends Model
{
    protected $fillable = ['specialite', 'expreinces', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
