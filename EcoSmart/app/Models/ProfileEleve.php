<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Classe;

class ProfileEleve extends Model
{
    protected $fillable = ['sex','number_parent', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function classe(){
        return $this->belongsTo(Classe::class);
    }
}
