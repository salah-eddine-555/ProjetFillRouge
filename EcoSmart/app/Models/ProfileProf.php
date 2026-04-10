<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileProf extends Model
{
    protected $table = 'profile_professeurs';

    protected $fillable = ['specialite', 'experiences', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
