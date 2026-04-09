<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class ProfileEleve extends Model
{
    protected $fillable = ['sex','number_parent', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
