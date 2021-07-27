<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Eventos/Eventos');
    }

    public function show($id){
        return Inertia::render('Admin/Eventos/Evento');
    }
}
