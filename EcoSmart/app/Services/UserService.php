<?php
namespace App\Services;
use App\Models\User;

class UserService {

    public function UpdateStatut($data): bool {

        $user = User::find($data['user_id']);

        if(!$user){
            return  false;
        }
        $user->is_active = !$user->is_active;
        $user->save();

        return true;
    }
}