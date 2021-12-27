<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\HomeController;

Route::get('/', function () {
    return view('index');
})->name('homePage');

Route::get('/ConferenceRoom', [HomeController::class,'viewConferenceRoom'])->name('ConferenceRoom');

Route::get('/offRoom', function () {
    return view('ConferenceRoom.offRoom');
})->name('offRoom');

Route::get('login/google', [GoogleController::class, 'redirectToGoogle'])->name('login.google');
Route::get('login/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::get('/logout',function () {
    Auth::logout();
    session()->flush();
    return redirect('');
});


