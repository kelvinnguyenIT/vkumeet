<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Google callback
    public function handleGoogleCallback()
    {
        $getInfo = Socialite::driver('google')->user();
        
        $user = User::where('provider_id', $getInfo->id)->first();
        
        if (!$user) {
            $create = User::create([
                'name'     => $getInfo->name,
                'email'    => $getInfo->email,
                'avatar'    => $getInfo->avatar,
                'provider_id' => $getInfo->getId()
            ]);
        }
        
        session()->put('id',$getInfo->getId());
        session()->put('name',$getInfo->getName());
        session()->put('email',$getInfo->getEmail());
        session()->put('avatar',$getInfo->getAvatar());


        return redirect('');
    }

    
}
