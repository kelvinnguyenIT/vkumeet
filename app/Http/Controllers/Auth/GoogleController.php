<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    //
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $getInfo = Socialite::driver('google')->user();
        
        $user = User::where('provider_id', $getInfo->id)->first();

        if (!$user) {
            User::create([
                'name'     => $getInfo->name,
                'email'    => $getInfo->email,
                'avatar'    => $getInfo->avatar,
                'provider_id' => $getInfo->id
            ]);
        }
        
        session()->put('id',$getInfo->id);
        session()->put('name',$getInfo->name);
        session()->put('email',$getInfo->email);
        session()->put('avatar',$getInfo->avatar);


        return redirect('');
    }

}
