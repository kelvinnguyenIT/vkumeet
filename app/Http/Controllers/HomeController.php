<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function viewConferenceRoom(Request $request)
    {
        $idRoom = $request->r;
        return view('ConferenceRoom.index',compact("idRoom"));
    }
}
